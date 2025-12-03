export interface ChatMessage {
  id: number;
  sender: "stakeholder" | "player";
  text: string;
}

export interface ChatNode {
  id: string;
  messages: ChatMessage[];
  next?: string;
  followUp?: string;
  playerTextNext?: string;
  playerTextFollowUp?: string;
}

export const chatScript: Record<string, ChatNode> = {
  start: {
    id: "start",
    messages: [
      { id: 1, sender: "stakeholder", text: "Hi! Ich habe eine recht komplizierte Bestellung." },
      { id: 2, sender: "stakeholder", text: "Ich hoffe das ist okay." },
    ],
    next: "weiter1",
    followUp: "nachfrage1",
    playerTextNext: "Klar, kein Problem. Legen wir los.",
    playerTextFollowUp: "Was meinen Sie denn mit kompliziert? Wollen Sie viele Zutaten?",
  },
  nachfrage1: {
    id: "nachfrage1",
    messages: [
      { id: 3, sender: "stakeholder", text: "Ich bestelle hier schon seit Jahren und habe mein Lieblings-Sandwich perfektioniert. Deshalb habe ich recht viele Sonderwünsche." },
    ],
    next: "weiter1",
  },
  weiter1: {
    id: "weiter1",
    messages: [
      { id: 4, sender: "stakeholder", text: "Beim Brot nehme ich wie immer das gleiche." },
    ],
    next: "weiter2",
    followUp: "nachfrage2",
    playerTextNext: "Kein Problem. Das übliche Brot also.",
    playerTextFollowUp: "Was ist denn Ihr übliches Brot?",
  },
  nachfrage2: {
    id: "nachfrage2",
    messages: [
      { id: 5, sender: "stakeholder", text: "Oh, stimmt. Das wissen Sie natürlich nicht. Sauerteigbrot, bitte!" },
      { id: 6, sender: "stakeholder", text: "Es muss übrigens auch nicht glutenfrei sein." },
    ],
    next: "weiter2",
  },
  weiter2: {
    id: "weiter2",
    messages: [
      { id: 7, sender: "stakeholder", text: "Dann möchte ich, dass es vegetarisch ist." },
    ],
    next: "weiter3",
    followUp: "nachfrage3",
    playerTextNext: "Okay, vegetarisch.",
    playerTextFollowUp: "Was genau verstehen Sie unter vegetarisch? Kein Fleisch, keine tierischen Produkte...?",
  },
  nachfrage3: {
    id: "nachfrage3",
    messages: [
      { id: 8, sender: "stakeholder", text: "Na, halt kein Fleisch. Aber Käse und so sind natürlich okay!" },
    ],
    next: "weiter3",
  },
  weiter3: {
    id: "weiter3",
    messages: [
      { id: 9, sender: "stakeholder", text: "Ich hätte gerne alle grünen Zutaten die Sie haben." },
    ],
    next: "weiter4",
    followUp: "nachfrage4",
    playerTextNext: "Alles klar!",
    playerTextFollowUp: "Welche Zutaten genau sind denn grün?",
  },
  nachfrage4: {
    id: "nachfrage4",
    messages: [
      { id: 10, sender: "stakeholder", text: "Ich weiß ja nicht was aktuell in der Küche alles an Zutaten vorhanden ist." },
      { id: 11, sender: "stakeholder", text: "Guckt einfach mal nach was ihr alles habt. Solange es grün ist will ich es auf meinem Sandwich!" },
    ],
    next: "weiter4",
  },
  weiter4: {
    id: "weiter4",
    messages: [
      { id: 12, sender: "stakeholder", text: "Als Soße will ich die Honig-Senf-Soße." },
    ],
    next: "weiter5",
    followUp: "nachfrage5",
    playerTextNext: "Honig-Senf. Habe ich so notiert.",
    playerTextFollowUp: "Honig-Senf? Sicher?",
  },
  nachfrage5: {
    id: "nachfrage5",
    messages: [
      { id: 13, sender: "stakeholder", text: "Warum, stimmt etwas nicht mit der Honig-Senf-Sauce? Ja, ich bin mir sicher, dass ich sie will." },
    ],
    next: "weiter5",
  },
  weiter5: {
    id: "weiter5",
    messages: [
      { id: 14, sender: "stakeholder", text: "Ansonsten bitte noch Mozzarella-Käse auf dem Sandwich." },
    ],
    next: "weiter6",
    followUp: "nachfrage6",
    playerTextNext: "Mozzarella, okay.",
    playerTextFollowUp: "Mozzarella zusammen mit Honig-Senf-Sauce?",
  },
  nachfrage6: {
    id: "nachfrage6",
    messages: [
      { id: 15, sender: "stakeholder", text: "Ist das so ungewöhnlich? Ja, ich bleibe dabei." },
    ],
    next: "weiter6",
  },
  weiter6: {
    id: "weiter6",
    messages: [
      { id: 16, sender: "stakeholder", text: "Oh, mir fällt gerade ein... Ihr habt hier auch Avocado, oder?" },
      { id: 17, sender: "stakeholder", text: "Avocado will ich auf keinen Fall auf meinem Sandwich. Also alle grünen Zutaten, bis auf Avocado." },
    ],
    next: "weiter7",
    followUp: "nachfrage7",
    playerTextNext: "Das habe ich so angepasst.",
    playerTextFollowUp: "Gibt es sonst noch grüne Zutaten die Sie nicht wollen?",
  },
  nachfrage7: {
    id: "nachfrage7",
    messages: [
      { id: 18, sender: "stakeholder", text: "Nein, mir schmeckt nur Avocado nicht. Entschuldigung, da hatte ich nicht dran gedacht." },
    ],
    next: "weiter7",
  },
  weiter7: {
    id: "weiter7",
    messages: [
      { id: 19, sender: "stakeholder", text: "Und dann als letztes noch die leckeren Hühnchenstreifen." },
    ],
    next: "ende",
    followUp: "nachfrage8",
    playerTextNext: "Alles klar!",
    playerTextFollowUp: "Sollte das Sandwich nicht vegetarisch sein?",
  },
  nachfrage8: {
    id: "nachfrage8",
    messages: [
      { id: 20, sender: "stakeholder", text: "Ja, ich meine die vegetarischen Hühnchenstreifen! Also die aus Fleischersatz. Aber nur wenn ihr sie noch da habt." },
    ],
    next: "ende",
  },
  ende: {
    id: "ende",
    messages: [
      { id: 21, sender: "stakeholder", text: "Das wars! Meine Bestellung ist damit fertig." },
    ],
  },
};

