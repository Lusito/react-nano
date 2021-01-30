export const getPathWithoutBasename = (basename: string) => document.location.pathname.substring(basename.length);

export function getBasename() {
    const base = document.querySelector("base");
    if (!base) return "";
    const basename = `/${base.href.split("/").slice(3).join("/")}`;
    if (basename.endsWith("/")) return basename.substr(0, basename.length - 1);
    return basename;
}
