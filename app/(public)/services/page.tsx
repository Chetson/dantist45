import db from '@/lib/db';

export const metadata = {
  title: 'Услуги и цены | Стоматология dantist45',
  description:
    'Цены на стоматологические услуги в Кургане. Лечение зубов, протезирование, имплантация.',
};

interface Category {
  id: number;
  name: string;
}

interface Service {
  id: number;
  category_id: number;
  name: string;
  price: string;
}

function formatPrice(priceStr: string) {
  const numbers = priceStr.match(/\d+/g);
  if (!numbers) return priceStr;

  let formatted = priceStr;
  numbers.forEach((num) => {
    const formattedNum = new Intl.NumberFormat('ru-RU').format(parseInt(num));
    formatted = formatted.replace(num, formattedNum);
  });

  formatted = formatted.replace(/(?:р|Р|руб|руб\.)/g, '₽').trim();

  if (!formatted.includes('₽') && numbers.length > 0) {
    formatted += ' ₽';
  }

  return formatted;
}

export default async function ServicesPage() {
  const categories = db
    .prepare('SELECT * FROM service_categories ORDER BY order_index ASC, name ASC')
    .all() as Category[];
  const services = db
    .prepare('SELECT * FROM services ORDER BY order_index ASC, name ASC')
    .all() as Service[];

  const servicesByCategory = categories
    .map((category) => ({
      ...category,
      services: services.filter((s) => s.category_id === category.id),
    }))
    .filter((c) => c.services.length > 0);

  return (
    <div className="bg-white">
      <header className="bg-primary relative -mt-24 overflow-hidden pt-48 pb-32 text-white">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <h1 className="mb-4 text-5xl leading-tight font-black md:text-7xl">
            Наши услуги <br /> и цены
          </h1>
          <p className="max-w-lg text-xl font-medium text-blue-100">
            Профессиональная забота о вашей улыбке с использованием передовых технологий.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-32 space-y-24">
          {[
            {
              title: 'Удаление зубов ультразвуком',
              content: (
                <>
                  <p>
                    Удаление зубов с помощью ультразвука представляет собой инновационную методику,
                    набирающую популярность в сфере современной стоматологии.
                  </p>
                  <p>
                    Кровотечение и болевые ощущения уже не являются спутниками стоматологической
                    процедуры, и это радует пациентов клиник больше всего.
                  </p>
                  <p>
                    Аппарат действует посредством ультразвуковых волн. Образовывается своеобразный
                    ультразвуковой скальпель, который действует направлено и гораздо более
                    аккуратно. Хирургу легче контролировать надрезы. Сам аппарат даже не прикасается
                    к мягким тканям.
                  </p>
                </>
              ),
              icon: '⚡',
              accent: 'bg-blue-500',
            },
            {
              title: 'Гигиена полости рта аппаратом Air Flow',
              content: (
                <>
                  <p>
                    Air flow чистка – это процедура чистки зубов, выполняемая с помощью воздушной
                    струи с водно-абразивным раствором специальным аппаратом.
                  </p>
                  <p>
                    Этот способ никак не относится ни к химическому воздействию на ротовую полость,
                    ни к механическому. Скорее это дополнительный метод удаления с зубов плотного
                    или мягкого налёта, который быстро и безвредно придаёт им естественный оттенок.
                  </p>
                </>
              ),
              icon: '💨',
              accent: 'bg-emerald-500',
            },
            {
              title: 'Бюгельное протезирование',
              content: (
                <>
                  <p>
                    Бюгельный протез является съемной стоматологической конструкцией, благодаря
                    которой жевательная нагрузка распределяется не только на опорные зубы, но и на
                    остальную часть челюсти.
                  </p>
                  <p>
                    Такой вид протезирования считается самым современным, аккуратным и эстетическим
                    вариантом среди всех существующих на сегодня.
                  </p>
                  <p>
                    Ведь благодаря прочной конструкции и материалу он может прослужить дольше
                    обычного, а внешний вид улыбки становится идеальным.
                  </p>
                </>
              ),
              icon: '🦷',
              accent: 'bg-indigo-500',
            },
            {
              title: 'Зубные эластичные протезы Acry-Free и Вертекс',
              content: (
                <>
                  <p>
                    Эластичный протез – это новый тип протезирования при частичном и полном
                    отсутствии зубов. Эластичность проявляется под воздействием температуры полости
                    рта.
                  </p>
                  <p>
                    Эти протезы изготавливаются из особого типа акриловой пластмассы, не содержащей
                    мономера и благодаря этому протез АкриФри:
                  </p>
                  <ul className="mt-6 space-y-3 pl-2">
                    {[
                      'Не ощущается как нечто инородное',
                      'Выдерживает сильные давления, к примеру, при употреблении сырых овощей',
                      'Не травмирует и не натирает слизистую рта, при этом оно надежно зафиксировано безметалловыми держателями из того же материала, что и базис',
                      'Неотличим от естественной структуры десен.',
                    ].map((text, i) => (
                      <li key={i} className="flex items-start">
                        <div className="mr-4 mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></div>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ),
              icon: '✨',
              accent: 'bg-purple-500',
            },
          ].map((item, idx) => (
            <article key={idx} className="relative">
              <div className="flex flex-col gap-8 md:flex-row md:items-start">
                <div className="flex shrink-0 items-center gap-4 md:flex-col md:items-start md:gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl shadow-sm transition-transform hover:scale-110">
                    {item.icon}
                  </div>
                  <div className={`hidden h-12 w-0.5 md:block ${item.accent} opacity-20`}></div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-6 text-3xl font-black text-slate-900 md:text-4xl">
                    {item.title}
                  </h3>
                  <div className="max-w-3xl space-y-6 text-xl leading-relaxed font-medium text-slate-600">
                    {item.content}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="space-y-20">
          {servicesByCategory.length === 0 ? (
            <div className="rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50 py-20 text-center">
              <p className="text-xl font-bold text-slate-500">
                Список услуг временно пуст. Пожалуйста, зайдите позже.
              </p>
            </div>
          ) : (
            servicesByCategory.map((category) => (
              <section key={category.id}>
                <div className="mb-8 flex items-center space-x-4">
                  <div className="bg-primary h-1.5 w-12 rounded-full"></div>
                  <h2 className="text-foreground text-3xl font-black">{category.name}</h2>
                </div>
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-2xl shadow-blue-900/5">
                  <table className="min-w-full divide-y divide-slate-100">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th
                          scope="col"
                          className="px-6 py-2 text-left text-xs font-black tracking-[0.1em] text-slate-400 uppercase"
                        >
                          Наименование
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-right text-xs font-black tracking-[0.1em] text-slate-400 uppercase"
                        >
                          Стоимость
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {category.services.map((service) => (
                        <tr
                          key={service.id}
                          className="group transition-colors hover:bg-blue-50/30"
                        >
                          <td className="group-hover:text-primary px-6 py-4 text-md leading-tight text-slate-700 transition-colors">
                            {service.name}
                          </td>
                          <td className="px-6 py-4 text-right text-md font-bold whitespace-nowrap text-slate-600">
                            {formatPrice(service.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))
          )}
        </div>

        <section id="appointment" className="mt-32">
          <div className="bg-accent shadow-3xl relative overflow-hidden rounded-[4rem] px-8 py-20 text-white shadow-emerald-500/20 md:px-20 lg:flex lg:items-center lg:justify-between">
            <div className="absolute top-0 left-0 -mt-20 -ml-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

            <div className="z-10 text-center lg:max-w-xl lg:text-left">
              <h2 className="text-4xl leading-tight font-black md:text-6xl">Нужна консультация?</h2>
              <p className="mt-8 max-w-lg text-xl leading-relaxed font-medium text-emerald-50">
                Запишитесь на первичный осмотр, и наши специалисты подберут оптимальный план
                лечения.
              </p>
            </div>
            <div className="z-10 mt-12 flex flex-col items-center space-y-4 lg:mt-0 lg:items-end">
              <a
                href="tel:+73522123456"
                className="text-accent inline-flex items-center justify-center rounded-3xl bg-white px-10 py-5 text-2xl font-black shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                +7 (3522) 12-34-56
              </a>
              <p className="text-sm font-bold tracking-widest text-emerald-100 uppercase opacity-80">
                Перезвоним в течение 15 минут
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
