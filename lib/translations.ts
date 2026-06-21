export type SupportedLang =
  | "english" | "hindi" | "telugu" | "marathi"
  | "kannada" | "malayalam" | "tamil" | "urdu";

export interface LangStrings {
  label: string;          // display name of language
  nativeLabel: string;    // language name in its own script
  flag: string;           // emoji flag
  togetherWithFamilies: string;
  requestPleasure: string;
  countingDownToForever: string;
  weddingCeremony: string;
  reception: string;
  dressCode: string;
  weddingCelebrations: string;
  aboutTheCouple: string;
  withBlessingsOfFamilies: string;
  bridesFamily: string;
  groomsFamily: string;
  ourStory: string;
  kindlyRsvp: string;
  rsvpOnWhatsapp: string;
  shareYourMoments: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  venue: string;
  and: string;
}

export const TRANSLATIONS: Record<SupportedLang, LangStrings> = {
  english: {
    label: "English", nativeLabel: "English", flag: "🇬🇧",
    togetherWithFamilies: "Together with their families",
    requestPleasure: "request the pleasure of your company",
    countingDownToForever: "Counting Down to Forever",
    weddingCeremony: "Wedding Ceremony",
    reception: "Reception",
    dressCode: "Dress Code",
    weddingCelebrations: "Wedding Celebrations",
    aboutTheCouple: "About the Couple",
    withBlessingsOfFamilies: "With the Blessings of Our Families",
    bridesFamily: "Bride's Family",
    groomsFamily: "Groom's Family",
    ourStory: "Our Story",
    kindlyRsvp: "Kindly RSVP",
    rsvpOnWhatsapp: "RSVP on WhatsApp",
    shareYourMoments: "Share your moments",
    days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
    venue: "Venue", and: "&",
  },
  hindi: {
    label: "Hindi", nativeLabel: "हिंदी", flag: "🇮🇳",
    togetherWithFamilies: "अपने परिवारों के साथ",
    requestPleasure: "आपकी उपस्थिति का सौभाग्य चाहते हैं",
    countingDownToForever: "शुभ मुहूर्त की उलटी गिनती",
    weddingCeremony: "विवाह समारोह",
    reception: "रिसेप्शन",
    dressCode: "वेशभूषा",
    weddingCelebrations: "विवाह उत्सव",
    aboutTheCouple: "वर-वधू परिचय",
    withBlessingsOfFamilies: "हमारे परिवारों के आशीर्वाद से",
    bridesFamily: "वधू पक्ष",
    groomsFamily: "वर पक्ष",
    ourStory: "हमारी प्रेम कहानी",
    kindlyRsvp: "कृपया उपस्थिति की सूचना दें",
    rsvpOnWhatsapp: "WhatsApp पर RSVP करें",
    shareYourMoments: "अपने पल साझा करें",
    days: "दिन", hours: "घंटे", minutes: "मिनट", seconds: "सेकंड",
    venue: "स्थान", and: "और",
  },
  telugu: {
    label: "Telugu", nativeLabel: "తెలుగు", flag: "🌟",
    togetherWithFamilies: "వారి కుటుంబాలతో కలిసి",
    requestPleasure: "మీ శుభాగమనం కోసం ఆహ్వానిస్తున్నాం",
    countingDownToForever: "శుభముహూర్తానికి కౌంట్‌డౌన్",
    weddingCeremony: "వివాహ వేడుక",
    reception: "రిసెప్షన్",
    dressCode: "దుస్తుల నియమావళి",
    weddingCelebrations: "వివాహ వేడుకలు",
    aboutTheCouple: "వధూవరుల పరిచయం",
    withBlessingsOfFamilies: "మా కుటుంబాల ఆశీర్వాదాలతో",
    bridesFamily: "వధువు కుటుంబం",
    groomsFamily: "వరుడి కుటుంబం",
    ourStory: "మా ప్రేమ కథ",
    kindlyRsvp: "దయచేసి రావడాన్ని నిర్ధారించండి",
    rsvpOnWhatsapp: "WhatsApp లో RSVP చేయండి",
    shareYourMoments: "మీ క్షణాలు పంచుకోండి",
    days: "రోజులు", hours: "గంటలు", minutes: "నిమిషాలు", seconds: "సెకన్లు",
    venue: "వేడుక స్థలం", and: "మరియు",
  },
  marathi: {
    label: "Marathi", nativeLabel: "मराठी", flag: "🧡",
    togetherWithFamilies: "त्यांच्या कुटुंबांसह",
    requestPleasure: "आपल्या उपस्थितीचा मान मिळावा अशी विनंती आहे",
    countingDownToForever: "शुभमुहूर्ताची उलटगणना",
    weddingCeremony: "विवाह सोहळा",
    reception: "रिसेप्शन",
    dressCode: "पेहराव संहिता",
    weddingCelebrations: "लग्न समारंभ",
    aboutTheCouple: "वर-वधूची ओळख",
    withBlessingsOfFamilies: "आमच्या कुटुंबाच्या आशीर्वादाने",
    bridesFamily: "वधूचे कुटुंब",
    groomsFamily: "वराचे कुटुंब",
    ourStory: "आमची प्रेमकहाणी",
    kindlyRsvp: "उपस्थितीची कृपया नोंद करावी",
    rsvpOnWhatsapp: "WhatsApp वर RSVP करा",
    shareYourMoments: "तुमचे क्षण शेअर करा",
    days: "दिवस", hours: "तास", minutes: "मिनिटे", seconds: "सेकंद",
    venue: "ठिकाण", and: "आणि",
  },
  kannada: {
    label: "Kannada", nativeLabel: "ಕನ್ನಡ", flag: "💛",
    togetherWithFamilies: "ತಮ್ಮ ಕುಟುಂಬಗಳೊಂದಿಗೆ",
    requestPleasure: "ನಿಮ್ಮ ಶುಭ ಆಗಮನವನ್ನು ಕೋರುತ್ತೇವೆ",
    countingDownToForever: "ಶುಭ ಮುಹೂರ್ತಕ್ಕೆ ಎಣಿಕೆ",
    weddingCeremony: "ವಿವಾಹ ಸಮಾರಂಭ",
    reception: "ರಿಸೆಪ್ಷನ್",
    dressCode: "ಉಡುಗೆ ನಿಯಮ",
    weddingCelebrations: "ವಿವಾಹ ಆಚರಣೆಗಳು",
    aboutTheCouple: "ವಧೂವರರ ಪರಿಚಯ",
    withBlessingsOfFamilies: "ನಮ್ಮ ಕುಟುಂಬಗಳ ಆಶೀರ್ವಾದದೊಂದಿಗೆ",
    bridesFamily: "ವಧುವಿನ ಕುಟುಂಬ",
    groomsFamily: "ವರನ ಕುಟುಂಬ",
    ourStory: "ನಮ್ಮ ಪ್ರೇಮ ಕಥೆ",
    kindlyRsvp: "ದಯವಿಟ್ಟು ದೃಢೀಕರಿಸಿ",
    rsvpOnWhatsapp: "WhatsApp ನಲ್ಲಿ RSVP ಮಾಡಿ",
    shareYourMoments: "ನಿಮ್ಮ ಕ್ಷಣಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
    days: "ದಿನಗಳು", hours: "ಗಂಟೆಗಳು", minutes: "ನಿಮಿಷಗಳು", seconds: "ಸೆಕೆಂಡ್",
    venue: "ಸ್ಥಳ", and: "ಮತ್ತು",
  },
  malayalam: {
    label: "Malayalam", nativeLabel: "മലയാളം", flag: "🌴",
    togetherWithFamilies: "അവരുടെ കുടുംബങ്ങളോടൊപ്പം",
    requestPleasure: "നിങ്ങളുടെ സാന്നിധ്യം അഭ്യർഥിക്കുന്നു",
    countingDownToForever: "ശുഭ മുഹൂർത്തത്തിലേക്കുള്ള എണ്ണൽ",
    weddingCeremony: "വിവാഹ ചടങ്ങ്",
    reception: "റിസപ്ഷൻ",
    dressCode: "വസ്ത്ര നിർദ്ദേശം",
    weddingCelebrations: "വിവാഹ ആഘോഷങ്ങൾ",
    aboutTheCouple: "വധൂവരന്മാരുടെ പരിചയം",
    withBlessingsOfFamilies: "ഞങ്ങളുടെ കുടുംബങ്ങളുടെ അനുഗ്രഹത്തോടെ",
    bridesFamily: "വധുവിന്റെ കുടുംബം",
    groomsFamily: "വരന്റെ കുടുംബം",
    ourStory: "ഞങ്ങളുടെ കഥ",
    kindlyRsvp: "ദയവായി സ്ഥിരീകരിക്കുക",
    rsvpOnWhatsapp: "WhatsApp-ൽ RSVP ചെയ്യുക",
    shareYourMoments: "നിങ്ങളുടെ നിമിഷങ്ങൾ പങ്കിടുക",
    days: "ദിവസങ്ങൾ", hours: "മണിക്കൂറുകൾ", minutes: "മിനിറ്റുകൾ", seconds: "സെക്കൻഡ്",
    venue: "വേദി", and: "ഉം",
  },
  tamil: {
    label: "Tamil", nativeLabel: "தமிழ்", flag: "🌺",
    togetherWithFamilies: "அவர்களின் குடும்பங்களுடன்",
    requestPleasure: "உங்கள் வருகையை வேண்டுகிறோம்",
    countingDownToForever: "சுப நேரத்திற்கான எண்ணிக்கை",
    weddingCeremony: "திருமண விழா",
    reception: "வரவேற்பு விழா",
    dressCode: "உடை விதிமுறை",
    weddingCelebrations: "திருமண கொண்டாட்டங்கள்",
    aboutTheCouple: "மணமக்கள் அறிமுகம்",
    withBlessingsOfFamilies: "எங்கள் குடும்பங்களின் ஆசியுடன்",
    bridesFamily: "மணமகளின் குடும்பம்",
    groomsFamily: "மணமகனின் குடும்பம்",
    ourStory: "எங்கள் காதல் கதை",
    kindlyRsvp: "உங்கள் வருகையை உறுதிப்படுத்தவும்",
    rsvpOnWhatsapp: "WhatsApp-இல் RSVP செய்யுங்கள்",
    shareYourMoments: "உங்கள் தருணங்களை பகிருங்கள்",
    days: "நாட்கள்", hours: "மணிகள்", minutes: "நிமிடங்கள்", seconds: "வினாடிகள்",
    venue: "இடம்", and: "மற்றும்",
  },
  urdu: {
    label: "Urdu", nativeLabel: "اردو", flag: "☪️",
    togetherWithFamilies: "اپنے خاندانوں کے ساتھ",
    requestPleasure: "آپ کی تشریف آوری کی دعوت دیتے ہیں",
    countingDownToForever: "شادی کی الٹی گنتی",
    weddingCeremony: "نکاح تقریب",
    reception: "ولیمہ",
    dressCode: "لباس کا ضابطہ",
    weddingCelebrations: "شادی کی رسومات",
    aboutTheCouple: "دولہا دلہن کا تعارف",
    withBlessingsOfFamilies: "ہمارے خاندانوں کی دعاؤں کے ساتھ",
    bridesFamily: "دلہن کا خاندان",
    groomsFamily: "دولہا کا خاندان",
    ourStory: "ہماری محبت کی کہانی",
    kindlyRsvp: "براہ کرم حاضری کی اطلاع دیں",
    rsvpOnWhatsapp: "WhatsApp پر RSVP کریں",
    shareYourMoments: "اپنے لمحات شیئر کریں",
    days: "دن", hours: "گھنٹے", minutes: "منٹ", seconds: "سیکنڈ",
    venue: "مقام", and: "اور",
  },
};

export const DEFAULT_LANG: SupportedLang = "english";

// Whether the language uses Latin script (letterSpacing is fine for Latin, breaks non-Latin)
export const LATIN_LANGS: SupportedLang[] = ["english", "urdu"];
// Note: Urdu uses RTL but still benefits from reduced spacing; we keep 0 for all non-English

export function isLatin(lang: SupportedLang): boolean {
  return lang === "english";
}

// Demo couple names translated per language for the preview
export const DEMO_NAMES: Record<SupportedLang, { bride: string; groom: string; story: string; hashtag: string }> = {
  english:   { bride: "Priya",    groom: "Rahul",   hashtag: "#PriyaWedRahul",   story: "We met at a friend's wedding in Goa and never stopped talking since. Three years, countless chai dates, and one breathtaking proposal later — here we are." },
  hindi:     { bride: "प्रिया",   groom: "राहुल",   hashtag: "#प्रियाराहुल2026", story: "हम गोवा में एक दोस्त की शादी में मिले और तब से बात करना कभी बंद नहीं हुआ। तीन साल, अनगिनत चाय की मुलाकातें और एक यादगार प्रपोज़ल के बाद — हम यहाँ हैं।" },
  telugu:    { bride: "ప్రియ",    groom: "రాహుల్",  hashtag: "#ప్రియరాహుల్2026", story: "మేము గోవాలో ఒక స్నేహితుని వివాహంలో కలిశాము మరియు అప్పటి నుండి మాట్లాడటం ఆపలేదు. మూడు సంవత్సరాలు, అనేక చాయ్ కలయికలు తర్వాత ఇక్కడ ఉన్నాము." },
  marathi:   { bride: "प्रिया",   groom: "राहुल",   hashtag: "#प्रियाराहुल2026",  story: "आम्ही गोव्यातील एका मित्राच्या लग्नात भेटलो आणि तेव्हापासून बोलणे थांबलेच नाही. तीन वर्षे, असंख्य चहाच्या भेटी नंतर — आम्ही इथे आहोत।" },
  kannada:   { bride: "ಪ್ರಿಯ",   groom: "ರಾಹುಲ್", hashtag: "#ಪ್ರಿಯರಾಹುಲ್2026",  story: "ನಾವು ಗೋವಾದಲ್ಲಿ ಒಬ್ಬ ಸ್ನೇಹಿತನ ಮದುವೆಯಲ್ಲಿ ಭೇಟಿಯಾದೆವು ಮತ್ತು ಅಂದಿನಿಂದ ಮಾತನಾಡುವುದನ್ನು ನಿಲ್ಲಿಸಲಿಲ್ಲ. ಮೂರು ವರ್ಷಗಳು, ಅನೇಕ ಚಹಾ ಭೇಟಿಗಳ ನಂತರ — ನಾವು ಇಲ್ಲಿದ್ದೇವೆ." },
  malayalam: { bride: "പ്രിയ",  groom: "രാഹുൽ",  hashtag: "#പ്രിയരാഹുൽ2026",  story: "ഞങ്ങൾ ഗോവയിൽ ഒരു സുഹൃത്തിന്റെ വിവാഹത്തിൽ കണ്ടുമുട്ടി, അന്നു മുതൽ സംസാരം നിര്‍ത്തിയിട്ടില്ല. മൂന്ന് വർഷങ്ങൾ, എണ്ണമറ്റ ചായ കൂടിക്കാഴ്ചകൾക്ക് ശേഷം — ഞങ്ങൾ ഇവിടെ ഉണ്ട്." },
  tamil:     { bride: "பிரியா",  groom: "ராகுல்",  hashtag: "#பிரியாராகுல்2026",  story: "நாங்கள் கோவாவில் ஒரு நண்பரின் திருமணத்தில் சந்தித்தோம், அன்றிலிருந்து பேசுவதை நிறுத்தவில்லை. மூன்று ஆண்டுகள், எண்ணற்ற தேநீர் சந்திப்புகளுக்கு பிறகு — நாங்கள் இங்கே இருக்கிறோம்." },
  urdu:      { bride: "پریا",    groom: "راہل",    hashtag: "#پریاراہل2026",     story: "ہم گوا میں ایک دوست کی شادی میں ملے اور تب سے بات کرنا بند نہیں ہوا۔ تین سال، لاتعداد چائے کی ملاقاتوں کے بعد — ہم یہاں ہیں۔" },
};

// Demo venue / event labels per language for the preview
export const DEMO_VENUE: Record<SupportedLang, { venue: string; venueAddress: string; dressCode: string; specialNote: string; brideFather: string; brideMother: string; groomFather: string; groomMother: string; event1Name: string; event2Name: string }> = {
  english:   { venue: "The Taj Palace",       venueAddress: "Apollo Bunder, Colaba, Mumbai", dressCode: "Black Tie / Indian Ethnic", specialNote: "Your presence is the greatest gift.", brideFather: "Mr. Sharma", brideMother: "Mrs. Sharma", groomFather: "Mr. Mehta",  groomMother: "Mrs. Mehta",  event1Name: "Mehendi Ceremony", event2Name: "Sangeet Night" },
  hindi:     { venue: "ताज पैलेस",             venueAddress: "अपोलो बंदर, कोलाबा, मुंबई",   dressCode: "ब्लैक टाई / भारतीय पोशाक", specialNote: "आपकी उपस्थिति सबसे बड़ा उपहार है।", brideFather: "श्री शर्मा", brideMother: "श्रीमती शर्मा", groomFather: "श्री मेहता", groomMother: "श्रीमती मेहता", event1Name: "मेहंदी समारोह", event2Name: "संगीत संध्या" },
  telugu:    { venue: "తాజ్ ప్యాలెస్",           venueAddress: "అపోలో బందర్, కొలాబా, ముంబై", dressCode: "బ్లాక్ టై / ఇండియన్ ఎథ్నిక్", specialNote: "మీ రాక మాకు అతిపెద్ద బహుమతి.", brideFather: "శ్రీ శర్మ", brideMother: "శ్రీమతి శర్మ", groomFather: "శ్రీ మెహతా", groomMother: "శ్రీమతి మెహతా", event1Name: "మెహందీ వేడుక", event2Name: "సంగీత రాత్రి" },
  marathi:   { venue: "ताज पॅलेस",              venueAddress: "अपोलो बंदर, कोलाबा, मुंबई",   dressCode: "ब्लॅक टाय / भारतीय पेहराव", specialNote: "तुमची उपस्थिती हीच सर्वात मोठी भेट आहे.", brideFather: "श्री. शर्मा", brideMother: "श्रीमती. शर्मा", groomFather: "श्री. मेहता", groomMother: "श्रीमती. मेहता", event1Name: "मेहंदी सोहळा", event2Name: "संगीत रात्र" },
  kannada:   { venue: "ತಾಜ್ ಪ್ಯಾಲೇಸ್",            venueAddress: "ಅಪೊಲೊ ಬಂದರ್, ಕೊಲಾಬಾ, ಮುಂಬೈ", dressCode: "ಬ್ಲ್ಯಾಕ್ ಟೈ / ಭಾರತೀಯ ಉಡುಗೆ", specialNote: "ನಿಮ್ಮ ಆಗಮನವೇ ನಮಗೆ ದೊಡ್ಡ ಉಡುಗೊರೆ.", brideFather: "ಶ್ರೀ ಶರ್ಮ", brideMother: "ಶ್ರೀಮತಿ ಶರ್ಮ", groomFather: "ಶ್ರೀ ಮೆಹ್ತಾ", groomMother: "ಶ್ರೀಮತಿ ಮೆಹ್ತಾ", event1Name: "ಮೆಹಂದಿ ಸಮಾರಂಭ", event2Name: "ಸಂಗೀತ ರಾತ್ರಿ" },
  malayalam: { venue: "താജ് പാലസ്",              venueAddress: "അപ്പോളോ ബന്ദർ, കൊളാബ, മുംബൈ", dressCode: "ബ്ലാക്ക് ടൈ / ഇന്ത്യൻ വേഷം", specialNote: "നിങ്ങളുടെ സാന്നിധ്യം ഏറ്റവും വലിയ സമ്മാനം.", brideFather: "ശ്രീ ശർമ്മ", brideMother: "ശ്രീമതി ശർമ്മ", groomFather: "ശ്രീ മേത്ത", groomMother: "ശ്രീമതി മേത്ത", event1Name: "മൈലാഞ്ചി ചടങ്ങ്", event2Name: "സംഗീത രാത്രി" },
  tamil:     { venue: "தாஜ் பேலஸ்",             venueAddress: "அப்போலோ பந்தர், கொலாபா, மும்பை", dressCode: "பிளாக் டை / இந்திய உடை", specialNote: "உங்கள் வருகையே மிகப் பெரிய பரிசு.", brideFather: "திரு. சர்மா", brideMother: "திருமதி. சர்மா", groomFather: "திரு. மேத்தா", groomMother: "திருமதி. மேத்தா", event1Name: "மருதாணி விழா", event2Name: "இசை இரவு" },
  urdu:      { venue: "تاج محل پیلس",            venueAddress: "اپولو بندر، کولابا، ممبئی",   dressCode: "بلیک ٹائی / ہندوستانی لباس", specialNote: "آپ کی موجودگی ہمارا سب سے بڑا تحفہ ہے۔", brideFather: "جناب شرما", brideMother: "محترمہ شرما", groomFather: "جناب مہتا", groomMother: "محترمہ مہتا", event1Name: "مہندی تقریب", event2Name: "موسیقی کی رات" },
};
