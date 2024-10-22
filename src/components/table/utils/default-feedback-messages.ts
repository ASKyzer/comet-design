import { TableFeedback } from "../application/domain/interfaces/table-feedback.interface";

export const DEFAULT_ERROR_MESSAGE: { [locale: string]: TableFeedback } = {
  en: {
    title: "Internal Server Error",
    subtitle:
      "The server encountered an error and could not complete your request.",
    theme: "error",
    hasReload: true,
  },
  de: {
    title: "Interner Serverfehler",
    subtitle:
      "Der Server ist auf einen Fehler gesto\u00dfen und konnte Ihre Anfrage nicht abschlie\u00dfen.",
    theme: "error",
    hasReload: true,
  },
  fr: {
    title: "Erreur interne du serveur",
    subtitle:
      "Le serveur a rencontré une erreur et n'a pas pu compléter votre demande.",
    theme: "error",
    hasReload: true,
  },
  it: {
    title: "Errore interno del server",
    subtitle:
      "Il server ha riscontrato un errore e non è riuscito a completare la tua richiesta",
    theme: "error",
    hasReload: true,
  },
};

export const DEFAULT_NO_RESULTS_MESSAGE: { [locale: string]: TableFeedback } = {
  en: {
    title: "No results to display",
    subtitle:
      "There was no result for the data you requested.  Please try again in a few moments.",
    theme: "warning",
    hasReload: false,
  },
  de: {
    title: "Keine Resultate",
    subtitle:
      "F\u00fcr die von Ihnen angeforderten Daten gab es kein Ergebnis. Bitte versuchen Sie es in einigen Augenblicken erneut.",
    theme: "warning",
    hasReload: false,
  },
  fr: {
    title: "Aucun résultat à afficher",
    subtitle:
      "Il n'y avait aucun résultat pour les données que vous avez demandées. Veuillez réessayer dans quelques instants.",
    theme: "warning",
    hasReload: false,
  },
  it: {
    title: "Nessun risultato da mostrare",
    subtitle:
      "Non ci sono risultati per i dati richiesti. Si prega di riprovare tra qualche momento.",
    theme: "warning",
    hasReload: false,
  },
};
