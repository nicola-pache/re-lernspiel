export type Sender = "stakeholder" | "player";

export interface ChatMessage {
  sender: Sender;
  text: string;
}

export interface ChatNode {
  stakeholderMessages: string[];

  next?: string;
  followUp?: string;

  playerNext?: string;
  playerFollowUp?: string;
}

export const chatScript: Record<string, ChatNode> = {
  start: {
    stakeholderMessages: [
      "Hi! Ich habe eine recht komplizierte Bestellung.",
      "Ich hoffe das ist okay.",
    ],
    next: "weiter1",
    followUp: "nachfrage1",
    playerNext: "Klar, kein Problem. Legen wir los.",
    playerFollowUp:
      "Was meinen Sie denn mit kompliziert? Wollen Sie viele Zutaten?",
  },
  nachfrage1: {
    stakeholderMessages: [
      "Ich bestelle hier schon seit Jahren und habe mein Lieblings-Sandwich perfektioniert. Deshalb habe ich recht viele Sonderwünsche.",
    ],
    next: "weiter1",
  },
  weiter1: {
    stakeholderMessages: ["Beim Brot nehme ich wie immer das gleiche."],
    next: "weiter2",
    followUp: "nachfrage2",
    playerNext: "Kein Problem. Das übliche Brot also.",
    playerFollowUp: "Was ist denn Ihr übliches Brot?",
  },
  nachfrage2: {
    stakeholderMessages: [
      "Oh, stimmt. Das wissen Sie natürlich nicht. Sauerteigbrot, bitte!",
      "Es muss übrigens auch nicht glutenfrei sein.",
    ],
    next: "weiter2",
  },
  weiter2: {
    stakeholderMessages: ["Dann möchte ich, dass es vegetarisch ist."],
    next: "weiter3",
    followUp: "nachfrage3",
    playerNext: "Okay, vegetarisch.",
    playerFollowUp:
      "Was genau verstehen Sie unter vegetarisch? Kein Fleisch, keine tierischen Produkte...?",
  },
  nachfrage3: {
    stakeholderMessages: [
      "Na, halt kein Fleisch. Aber Käse und so sind natürlich okay!",
    ],
    next: "weiter3",
  },
  weiter3: {
    stakeholderMessages: ["Ich hätte gerne alle grünen Zutaten die Sie haben."],
    next: "weiter4",
    followUp: "nachfrage4",
    playerNext: "Alles klar!",
    playerFollowUp: "Welche Zutaten genau sind denn grün?",
  },
  nachfrage4: {
    stakeholderMessages: [
      "Ich weiß ja nicht was aktuell in der Küche alles an Zutaten vorhanden ist.",
      "Guckt einfach mal nach was ihr alles habt. Solange es grün ist will ich es auf meinem Sandwich!",
    ],
    next: "weiter4",
  },
  weiter4: {
    stakeholderMessages: ["Als Soße will ich die Honig-Senf-Soße."],
    next: "weiter5",
    followUp: "nachfrage5",
    playerNext: "Honig-Senf. Habe ich so notiert.",
    playerFollowUp: "Honig-Senf? Sicher?",
  },
  nachfrage5: {
    stakeholderMessages: [
      "Warum, stimmt etwas nicht mit der Honig-Senf-Sauce? Ja, ich bin mir sicher, dass ich sie will.",
    ],
    next: "weiter5",
  },
  weiter5: {
    stakeholderMessages: [
      "Ansonsten bitte noch Mozzarella-Käse auf dem Sandwich.",
    ],
    next: "weiter6",
    followUp: "nachfrage6",
    playerNext: "Mozzarella, okay.",
    playerFollowUp: "Mozzarella zusammen mit Honig-Senf-Sauce?",
  },
  nachfrage6: {
    stakeholderMessages: ["Ist das so ungewöhnlich? Ja, ich bleibe dabei."],
    next: "weiter6",
  },
  weiter6: {
    stakeholderMessages: [
      "Oh, mir fällt gerade ein... Ihr habt hier auch Avocado, oder?",
      "Avocado will ich auf keinen Fall auf meinem Sandwich. Also alle grünen Zutaten, bis auf Avocado.",
    ],
    next: "weiter7",
    followUp: "nachfrage7",
    playerNext: "Das habe ich so angepasst.",
    playerFollowUp: "Gibt es sonst noch grüne Zutaten die Sie nicht wollen?",
  },
  nachfrage7: {
    stakeholderMessages: [
      "Nein, mir schmeckt nur Avocado nicht. Entschuldigung, da hatte ich nicht dran gedacht.",
    ],
    next: "weiter7",
  },
  weiter7: {
    stakeholderMessages: [
      "Und dann als letztes noch die leckeren Hühnchenstreifen.",
    ],
    next: "ende",
    followUp: "nachfrage8",
    playerNext: "Alles klar!",
    playerFollowUp: "Sollte das Sandwich nicht vegetarisch sein?",
  },
  nachfrage8: {
    stakeholderMessages: [
      "Ja, ich meine die vegetarischen Hühnchenstreifen! Also die aus Fleischersatz. Aber nur wenn ihr sie noch da habt.",
    ],
    next: "ende",
  },
  ende: {
    stakeholderMessages: ["Das wars! Meine Bestellung ist damit fertig."],
  },
};
