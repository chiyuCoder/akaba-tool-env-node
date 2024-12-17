import nodeFetch from "node-fetch";

export function fetchJson<T = any>(url: string, init?: nodeFetch.RequestInit): Promise<T> {
  return nodeFetch(url, init).then((res) => {
    return res.json();
  });
}

export function fetchText(url: string, init?: nodeFetch.RequestInit): Promise<string> {
  return nodeFetch(url, init).then((res) => {
    return res.text();
  });
}
