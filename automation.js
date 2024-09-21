// ==UserScript==
// @name         Persönlicher Instant Gaming Auto Giveaway
// @description  Ein benutzerfreundlicheres und sichereres Skript zur automatischen Teilnahme an Instant-Gaming-Giveaways.
// @version      1.0
// @author       kostjabtw
// @namespace    https://github.com/kostjabtw/InstantGamingGiveawayList
// @match        *://www.instant-gaming.com/*
// @match        *://github.com/kostjabtw/*
// @run-at       document-idle
// @grant        GM_registerMenuCommand
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  // Optional: Affiliate-Link (automatisch ohne Bestätigung)
  function addAffiliateLink() {
    if (
      !document.location.href.endsWith("?igr=kostjabtw") &&
      document.location.href.startsWith("https://www.instant-gaming.com/")
    ) {
      document.location.href = document.location.href + "?igr=kostjabtw";
    }
  }

  // Funktion zum Debugging in der Konsole
  function logAction(action) {
    console.log(`Aktion durchgeführt: ${action}`);
  }

  // Teilnahmefunktion mit Sicherheitsprüfung
  function participate() {
    const participateButton = document.querySelector("button.button.validate");
    if (participateButton) {
      if (
        !participateButton.disabled &&
        participateButton.offsetParent !== null
      ) {
        participateButton.click();
        logAction("Giveaway-Teilnahme geklickt");
        location.reload(); // Reload nur, wenn Teilnahme erfolgreich war
      } else {
        console.log(
          "Teilnahme-Button gefunden, aber deaktiviert oder nicht sichtbar."
        );
      }
    } else {
      console.log("Teilnahme-Button nicht gefunden.");
    }
  }

  // Funktion zum Klicken auf Social-Media-Links
  function socials() {
    const socialButtons = document.querySelectorAll("a.button.reward.alerts");
    if (socialButtons.length > 0) {
      socialButtons.forEach((button) => button.click());
      logAction("Alle Social-Media-Links geklickt");
    } else {
      console.log("Keine Social-Media-Links gefunden.");
    }
  }

  // Funktion zum Öffnen von Giveaways in neuen Tabs
  function openAllGiveaways() {
    const giveawayLinks = document.querySelectorAll("a.giveaway");
    if (giveawayLinks.length > 0) {
      giveawayLinks.forEach((link) => window.open(link.href, "_blank"));
      logAction("Alle Giveaway-Links geöffnet");
    } else {
      console.log("Keine Giveaway-Links gefunden.");
    }
  }

  // Benutzerdefiniertes Menü für Aktionen
  GM_registerMenuCommand("Giveaway-Teilnahme", participate);
  GM_registerMenuCommand("Social-Media-Links klicken", socials);
  GM_registerMenuCommand("Alle Giveaways öffnen", openAllGiveaways);
  GM_registerMenuCommand("Affiliate-Link hinzufügen", addAffiliateLink);

  // Automatische Aktionen
  participate(); // Automatische Teilnahme an Giveaways
  socials(); // Automatisches Klicken auf Social-Media-Links
})();
