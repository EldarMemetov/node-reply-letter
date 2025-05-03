export const templates = {
  feedback: {
    admin: ({ name, email, message }) => ({
      subject: 'Новое сообщение с формы обратной связи',
      text: `📩 Новое сообщение от ${name}\n✉ Email: ${email}\n💬 Сообщение:\n${message}`,
    }),
    user: () => ({
      subject: 'Дякуємо за звернення до Qvrix',
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <img src="cid:logo@qvrix" alt="Qvrix Logo" style="max-width: 150px; margin-bottom: 20px;" />
          <h2 style="color: #8e44ad;">Дякуємо за ваше повідомлення!</h2>
          <p>Ми отримали ваше повідомлення і незабаром зв'яжемося з вами.</p>
          <p>Qvrix — ваш партнер у галузі сучасної веб-розробки та відео-продукції.</p>
          <p>Ваші ідеї — наші інноваційні рішення: сучасні сайти, унікальний дизайн і професійні відео, які розвивають ваш бізнес.</p>
          <hr />
          <p style="font-size: 12px; color: #999;">©${new Date().getFullYear()} Qvrix. Усі права захищені.</p>
        </div>
      `,
      attachments: [
        {
          filename: 'logo.png',
          path: './public/images/logo.png',
          cid: 'logo@qvrix',
        },
      ],
    }),
  },
  review: {
    admin: ({ name, email, review, rating }) => ({
      subject: 'Новый отзыв на сайте',
      text: `📝 Отзыв от ${name}\n✉ Email: ${email}\n💬 Отзыв:\n${review}\n${rating}`,
    }),
    user: () => ({
      subject: 'Дякуємо за ваш відгук!',
      html: `
        <div style="font-family: sans-serif; color: #333;">
        <img src="cid:logo@qvrix" alt="Qvrix Logo" style="max-width: 150px; margin-bottom: 20px;" />
          <h2 style="color: #8e44ad;">Дякуємо за ваш відгук!</h2>
          <p>Щиро дякуємо за ваш відгук! Нам надзвичайно приємно отримувати такі повідомлення та знати, що ми рухаємось у правильному напрямку.</p>
          <p>Qvrix — ваш партнер у галузі сучасної веб-розробки та відео-продукції.</p>
          <p>Ваші ідеї — наші інноваційні рішення: сучасні сайти, унікальний дизайн і професійні відео, які розвивають ваш бізнес.</p>
          
          <hr />
          <p style="font-size: 12px; color: #999;">©${new Date().getFullYear()} Qvrix. Усі права захищені.</p>
        </div>
      `,
      attachments: [
        {
          filename: 'logo.png',
          path: './public/images/logo.png',
          cid: 'logo@qvrix',
        },
      ],
    }),
  },
};
