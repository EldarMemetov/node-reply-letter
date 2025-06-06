export const templates = {
  feedback: {
    admin: ({ name, email, message, lang }) => {
      const subjects = {
        en: 'New message from feedback form',
        de: 'Neue Nachricht vom Feedback-Formular',
        ua: 'Новое сообщение с формы обратной связи',
      };
      const texts = {
        en: `📩 New message from ${name}\n✉ Sender email: ${email}\n💬 Message:\n${message}`,
        de: `📩 Neue Nachricht von ${name}\n✉ Absender-E-Mail: ${email}\n💬 Nachricht:\n${message}`,
        ua: `📩 Нове повідомлення від ${name}\n✉ Email відправника: ${email}\n💬 Повідомлення:\n${message}`,
      };
      return {
        subject: subjects[lang] || subjects.ua,
        text: texts[lang] || texts.ua,
      };
    },
    user: ({ name, email, lang }) => {
      const subjects = {
        en: 'Thank you for contacting Qvrix',
        de: 'Danke für Ihre Nachricht an Qvrix',
        ua: 'Дякуємо за звернення до Qvrix',
      };
      const bodies = {
        en: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>Thank you for your message, ${name}!</h2>
            <p>We have received your message and will get back to you at ${email} shortly.</p>
            <p>Qvrix is your partner in modern web development and video production.</p>
            <p>Your ideas are our innovative solutions: modern websites, unique design, and professional videos that grow your business.</p>
            <hr />
            <p style="font-size:12px; color:#999;">©${new Date().getFullYear()} Qvrix. All rights reserved.</p>
          </div>
        `,
        de: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>Vielen Dank für Ihre Nachricht, ${name}!</h2>
            <p>Wir haben Ihre Nachricht erhalten und melden uns in Kürze unter ${email} bei Ihnen.</p>
            <p>Qvrix ist Ihr Partner für moderne Webentwicklung und Videoproduktion.</p>
            <p>Ihre Ideen sind unsere innovativen Lösungen: moderne Websites, einzigartiges Design und professionelle Videos, die Ihr Geschäft voranbringen.</p>
            <hr />
            <p style="font-size:12px; color:#999;">©${new Date().getFullYear()} Qvrix. Alle Rechte vorbehalten.</p>
          </div>
        `,
        ua: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>Дякуємо за ваше повідомлення, ${name}!</h2>
            <p>Ми отримали ваше повідомлення і найближчим часом напишемо вам на ${email}.</p>
            <p>Qvrix — ваш партнер у галузі сучасної веб-розробки та відео-продукції.</p>
            <p>Ваші ідеї — наші інноваційні рішення: сучасні сайти, унікальний дизайн і професійні відео, які розвивають ваш бізнес.</p>
            <hr />
            <p style="font-size:12px; color:#999;">©${new Date().getFullYear()} Qvrix. Усі права захищені.</p>
          </div>
        `,
      };
      return {
        subject: subjects[lang] || subjects.ua,
        html: bodies[lang] || bodies.ua,
      };
    },
  },
  review: {
    admin: ({ name, email, review, rating, lang }) => {
      const subjects = {
        en: 'New review on website',
        de: 'Neue Bewertung auf der Webseite',
        ua: 'Новий відгук на сайті',
      };
      const texts = {
        en: `📝 Review from ${name}\n✉ Email: ${email}\n💬 Review:\n${review}\n⭐ Rating: ${rating}`,
        de: `📝 Bewertung von ${name}\n✉ E-Mail: ${email}\n💬 Bewertung:\n${review}\n⭐ Bewertung: ${rating}`,
        ua: `📝 Відгук від ${name}\n✉ Email: ${email}\n💬 Відгук:\n${review}\n⭐ Рейтинг: ${rating}`,
      };
      return {
        subject: subjects[lang] || subjects.ua,
        text: texts[lang] || texts.ua,
      };
    },
    user: ({ name, email, lang }) => {
      const subjects = {
        en: 'Thank you for your review!',
        de: 'Danke für Ihre Bewertung!',
        ua: 'Дякуємо за ваш відгук!',
      };
      const bodies = {
        en: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>Thank you for your review, ${name}!</h2>
            <p>We greatly appreciate your feedback and will continue improving our services to serve you better.</p>
            <p>You will receive any follow-up at ${email} if needed.</p>
            <p>Qvrix is your partner in modern web development and video production.</p>
            <hr />
            <p style="font-size:12px; color:#999;">©${new Date().getFullYear()} Qvrix. All rights reserved.</p>
          </div>
        `,
        de: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>Vielen Dank für Ihre Bewertung, ${name}!</h2>
            <p>Wir schätzen Ihr Feedback sehr und werden unsere Dienstleistungen weiter verbessern, um Sie besser zu bedienen.</p>
            <p>Bei Bedarf erhalten Sie eine Rückmeldung an ${email}.</p>
            <p>Qvrix ist Ihr Partner für moderne Webentwicklung und Videoproduktion.</p>
            <hr />
            <p style="font-size:12px; color:#999;">©${new Date().getFullYear()} Qvrix. Alle Rechte vorbehalten.</p>
          </div>
        `,
        ua: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>Дякуємо за ваш відгук, ${name}!</h2>
            <p>Ми дуже цінуємо ваш відгук і продовжимо покращувати наші послуги, щоб краще вам служити.</p>
            <p>У разі потреби ви отримаєте відповідь на ${email}.</p>
            <p>Qvrix — ваш партнер у галузі сучасної веб-розробки та відео-продукції.</p>
            <hr />
            <p style="font-size:12px; color:#999;">©${new Date().getFullYear()} Qvrix. Усі права захищені.</p>
          </div>
        `,
      };
      return {
        subject: subjects[lang] || subjects.ua,
        html: bodies[lang] || bodies.ua,
      };
    },
  },
};
