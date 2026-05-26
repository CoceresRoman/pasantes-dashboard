import { NextResponse } from "next/server";
import { interns } from "@/data/interns";
import { missions } from "@/data/missions";

export const dynamic = "force-dynamic";

// Devuelve { [missionId]: { prUrl, mergedAt, repo, title } } para el pasante pedido.
// Match: el título del PR debe contener el matchCode de la misión como palabra completa.
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const internId = searchParams.get("intern");

  const intern = interns.find((i) => i.id === internId);
  if (!intern) {
    return NextResponse.json({ error: "intern no encontrado" }, { status: 404 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN no configurado en el server" },
      { status: 500 }
    );
  }

  const username = intern.github;
  const url = `https://api.github.com/search/issues?q=is:pr+is:merged+author:${encodeURIComponent(
    username
  )}&per_page=100&sort=updated&order=desc`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json(
      { error: "GitHub API error", status: res.status, body },
      { status: 502 }
    );
  }

  const data = await res.json();
  const prs = data.items || [];

  const result = {};
  for (const pr of prs) {
    const title = pr.title || "";
    const body = pr.body || "";
    const haystack = `${title}\n${body}`.toUpperCase();

    for (const m of missions) {
      const code = m.matchCode.toUpperCase();
      const re = new RegExp(`\\b${escapeRegex(code)}\\b`);
      if (re.test(haystack)) {
        const existing = result[m.id];
        const mergedAt = pr.pull_request?.merged_at || pr.closed_at;
        if (!existing || new Date(mergedAt) > new Date(existing.mergedAt)) {
          result[m.id] = {
            prUrl: pr.html_url,
            mergedAt,
            repo: pr.repository_url?.replace("https://api.github.com/repos/", "") || "",
            title,
          };
        }
      }
    }
  }

  return NextResponse.json({
    intern: internId,
    username,
    found: Object.keys(result).length,
    completions: result,
    syncedAt: new Date().toISOString(),
  });
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
