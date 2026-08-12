#!/usr/bin/env python3
"""Harvest IBM Maximo 9.2 documentation topics into a local cache.

IBM Documentation is a JavaScript SPA: plain fetches return an empty shell and
WebFetch gets HTTP 403. The undocumented content API below returns the rendered
topic HTML for a browser user-agent, which is what makes offline caching possible.

    https://www.ibm.com/docs/api/v1/content/<doc-path>

Raw HTML lands in raw/, extracted plain text in text/. Re-running is safe; it
overwrites in place. Add entries to PAGES to widen coverage.
"""
import concurrent.futures as cf
import html
import os
import re
import subprocess
import sys

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
API = "https://www.ibm.com/docs/api/v1/content/"
HERE = os.path.dirname(os.path.abspath(__file__))

# name -> doc path appended to API
PAGES = {
    "mas-92-whats-new":        "masv-and-l/cd?topic=new-whats-in-maximo-application-suite-92",
    "mas-91-whats-new":        "masv-and-l/cd?topic=new-whats-in-maximo-application-suite-91",
    "mas-90-whats-new":        "masv-and-l/cd?topic=new-whats-in-maximo-application-suite-90",
    "manage-92-whats-new":     "SSLPL8_cd/com.ibm.mam.doc/overview/c_wn_manage_92.html",
    "manage-91-whats-new":     "SSLPL8_cd/com.ibm.mam.doc/overview/c_wn_manage_91.html",
    "manage-90-whats-new":     "SSLPL8_cd/com.ibm.mam.doc/overview/c_wn_manage_90.html",
    "mobile-92-whats-new":     "SSLPL8_cd/com.ibm.mam.doc/overview/c_wn_mobile_92.html",
    "mobile-91-whats-new":     "SSLPL8_cd/com.ibm.mam.doc/overview/c_wn_mobile_91.html",
    "monitor-92-whats-new":    "SSQR84_cd/iot/overview/whats_new_92.html",
    "health-predict-92":       "SS7PRM_cd/com.ibm.ah.doc/overview/whats_new_92.html",
    "maximo-it-92":            "SSQ914_cd/com.ibm.sccd.doc/Overview/whats_new_9.2.html",
    "hse-92-whats-new":        "SS5GME_cd/hse/overview/whats_new_hse_92.html",
    "oilgas-92-whats-new":     "SSLL9G_cd/oil/overview/whats_new_oil_92.html",
    "mvi-92-whats-new":        "SSRU69_cd/base/whats_new_92.html",
    "mvi-edge-92-whats-new":   "SSRU69_cd/base/whats_new_edge_92.html",
    "ref-92-whats-new":        "SSZBD7_cd/topics/mref_whats_new_92.html",
    "collaborate-92":          "SSTPS3_cd/overview/c_wn_collaborate_92.html",
    "sap-connector-92":        "SSHGFK_cd/measap/overview/c_new_features_92.html",
    "spatial-92":              "msam/cd?topic=spatial-whats-new-in-maximo-92.html",
    # Upgrade mechanics, prerequisites and deprecations
    "upgrading":               "SSRHPA_cd/appsuite/install/c_ctr_upgrading.html",
    "upgrade-considerations":  "SSRHPA_cd/appsuite/install/c_ctr_upgrade_considerations.html",
    "upgrade-prerequisites":   "SSRHPA_cd/appsuite/install/r_upgrade_prerequisites.html",
    "upgrade-manage-checklist": "SSRHPA_cd/appsuite/install/r_upgrade_manage_checklist.html",
    "upgrade-validation-91-92": "SSRHPA_cd/appsuite/install/t_upgrade_validation_mas_91_to_92.html",
    "user-auth-upgrade-91":    "SSRHPA_cd/appsuite/install/c_user_auth_upgrade_91.html",
    "system-requirements":     "SSRHPA_cd/appsuite/install/dependencies/system_requirements.html",
    "mas-requirements":        "SSRHPA_cd/appsuite/install/dependencies/mas_requirements.html",
    "db2-upgrade-11-to-12":    "SSRHPA_cd/appsuite/install/t_ctr_upgrad_db2_v11_to_v12.html",
    "deprecated-maf":          "SSRHPA_cd/appsuite/appconfig/deprecated_maximo_application_framework_components.html",
}


def to_text(raw: str) -> str:
    """Flatten topic HTML to readable text, keeping table cells pipe-separated."""
    t = re.sub(r"(?is)<(script|style|noscript)[^>]*>.*?</\1>", " ", raw)
    t = re.sub(r"(?i)</(p|div|li|h[1-6]|tr|table|section)>", "\n", t)
    t = re.sub(r"(?i)</t[dh]>", " | ", t)
    t = re.sub(r"(?s)<[^>]+>", "", t)
    t = html.unescape(t)
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"\n\s*\n+", "\n", t)
    return t.strip()


def harvest(item):
    name, path = item
    url = API + path
    try:
        r = subprocess.run(["curl", "-sL", "--max-time", "45", "-A", UA, url],
                           capture_output=True, text=True, timeout=70)
    except subprocess.TimeoutExpired:
        return name, 0, "TIMEOUT", url
    raw = r.stdout
    text = to_text(raw)
    # An unresolved topic still returns the SPA shell, which flattens to ~350 chars.
    if len(text) < 800:
        return name, len(text), "MISS", url
    with open(os.path.join(HERE, "raw", name + ".html"), "w", encoding="utf-8") as f:
        f.write(raw)
    with open(os.path.join(HERE, "text", name + ".txt"), "w", encoding="utf-8") as f:
        f.write(f"# SOURCE: {url}\n# ACCESSED: 2026-08-12\n\n{text}\n")
    return name, len(text), "OK", url


def main():
    os.makedirs(os.path.join(HERE, "raw"), exist_ok=True)
    os.makedirs(os.path.join(HERE, "text"), exist_ok=True)
    pages = PAGES
    if len(sys.argv) > 1:  # harvest a subset by name
        pages = {k: v for k, v in PAGES.items() if k in sys.argv[1:]}
    ok = 0
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for name, n, status, url in ex.map(harvest, pages.items()):
            print(f"{status:<8}{n:>7}  {name}")
            ok += status == "OK"
    print(f"\n{ok}/{len(pages)} cached into {HERE}")


if __name__ == "__main__":
    main()
