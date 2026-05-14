import Image from 'next/image';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function Home() {
  const settings = db.prepare('SELECT * FROM settings').all() as { key: string; value: string }[];
  const settingsMap = settings.reduce(
    (acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    },
    {} as Record<string, string>
  );

  const isAnnouncementActive = settingsMap.announcement_active === 'true';
  const announcementHtml = settingsMap.announcement_html || '';

  return (
    <>
      {/* Hero Section */}
      <section className="relative -mt-24 flex min-h-[90vh] items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero_2.png"
            alt="Стоматология «Дантист»"
            fill
            className="object-cover brightness-[0.98]"
            priority
          />
          <div className="from-background via-background/60 absolute inset-0 bg-linear-to-r to-transparent"></div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="animate-fade-in-up max-w-3xl">
            <h1 className="text-foreground text-6xl leading-[1.1] font-black tracking-tight md:text-8xl">
              Искусство <br />
              <span className="text-primary underline decoration-blue-200 decoration-8 underline-offset-8">
                здоровой
              </span>{' '}
              улыбки
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-slate-600">
              Стоматология «Дантист» — это не просто клиника, это центр инноваций, где современные
              технологии сочетаются с высочайшим уровнем заботы о каждом пациенте.
            </p>
            <div className="mt-12 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <a
                href="#about"
                className="text-foreground hover:border-primary/20 inline-flex items-center justify-center rounded-2xl border-2 border-slate-200 bg-white/40 px-10 py-5 text-xl font-black backdrop-blur-xl transition-all hover:bg-white active:scale-95"
              >
                О клинике
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Section */}
      {isAnnouncementActive && announcementHtml && (
        <div className="relative z-20 mx-auto mt-6 mb-8 max-w-5xl px-4 md:-mt-12 md:mb-12 md:px-6">
          <div className="animate-fade-in relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl border-2 border-amber-200 bg-linear-to-r from-amber-50 to-orange-50 p-6 shadow-xl shadow-amber-950/10 md:flex-row md:gap-8 md:rounded-[3rem] md:p-12">
            {/* Decorative background icon */}
            <div className="pointer-events-none absolute right-0 bottom-0 rotate-12 text-8xl opacity-5 select-none">
              📢
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-200 text-2xl shadow-inner shadow-amber-300 md:h-20 md:w-20 md:rounded-3xl md:text-4xl">
              📢
            </div>
            <div className="w-full min-w-0 text-center md:text-left">
              <h2 className="mb-2 flex items-center justify-center gap-2 text-base font-black tracking-widest text-amber-900 uppercase md:mb-3 md:justify-start md:text-xl">
                Важное объявление
              </h2>
              <div
                className="prose prose-slate prose-sm md:prose-lg w-full max-w-full leading-relaxed font-medium text-amber-900/80 **:max-w-full **:wrap-break-word"
                dangerouslySetInnerHTML={{ __html: announcementHtml }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div
        className={`relative z-10 ${isAnnouncementActive ? 'my-8' : '-my-16'} mx-auto max-w-7xl px-6 transition-all duration-500`}
      >
        <div className="grid grid-cols-2 gap-4 rounded-[3rem] border border-white/50 bg-white/80 p-8 shadow-2xl shadow-blue-900/10 backdrop-blur-2xl lg:grid-cols-4">
          {[
            { val: '15+', label: 'Лет опыта' },
            { val: '10k', label: 'Пациентов' },
            { val: '24/7', label: 'Поддержка' },
            { val: '100%', label: 'Гарантия' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-primary text-4xl font-black">{stat.val}</div>
              <div className="mt-1 text-xs font-bold tracking-widest text-slate-400 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of the sections remain the same */}

      {/* About Clinic Section (Detailed Description) */}
      <section id="about" className="relative overflow-hidden bg-white py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="relative lg:w-1/2">
              <div className="bg-primary/10 absolute -top-12 -left-12 h-64 w-64 rounded-full blur-3xl"></div>
              <div className="float relative overflow-hidden rounded-[3rem] shadow-2xl">
                <Image
                  src="/images/about.png"
                  alt="Технологии клиники"
                  width={600}
                  height={700}
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
            <div className="space-y-8 lg:w-1/2">
              <div className="text-primary inline-block rounded-lg bg-blue-50 px-4 py-1.5 text-xs font-black tracking-widest uppercase">
                Стоматология нового поколения
              </div>
              <h2 className="text-foreground text-4xl leading-[1.2] font-black md:text-5xl">
                Мы меняем представление <br /> о визите к стоматологу
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-slate-600">
                <p>
                  Стоматология «Дантист» работает в Кургане с 2003 года. Мы специализируемся на
                  терапии, ортопедии, хирургии, имплантации, профессиональной чистке и гигиене.
                </p>
                <p>
                  У нас собраны почти все специалисты, благодаря чему пациент за один прием может
                  получить консультацию по лечению, протезированию, удалению и имплантации. В
                  «Дантисте» работают три терапевта, ортопед, хирург и хирург-имплантолог.
                  Стоматологи нашей клиники регулярно посещают симпозиумы, конференции, выставки и
                  бизнес-тренинги, проходят курсы повышения квалификации и стажируются в крупнейших
                  стоматологических центрах России.
                </p>
                <p>
                  Высокая квалификация наших специалистов позволяет оказывать врачебную помощь при
                  самых разнообразных и сложных стоматологических патологиях. Полное восстановление
                  зубочелюстной системы как в функциональном, так и в эстетическом смысле – вот тот
                  эталон, к которому мы непрерывно стремимся. Мы оказываем высококлассную
                  комплексную медицинскую помощь с учетом всех современных достижений медицины,
                  сводя при этом к минимуму возможные риски.
                </p>
                <ul className="grid grid-cols-1 gap-4 pt-4 text-sm font-bold text-slate-800 sm:grid-cols-2">
                  <li className="flex items-center space-x-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-600">
                      ✓
                    </span>
                    <span>Свой цифровой цех</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-600">
                      ✓
                    </span>
                    <span>Микроскопия Leica</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-600">
                      ✓
                    </span>
                    <span>Пожизненная гарантия</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-600">
                      ✓
                    </span>
                    <span>Лечение во сне</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative bg-slate-50 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <h2 className="text-foreground mb-4 text-4xl font-black md:text-5xl">
              Нам доверяют улыбки
            </h2>
            <p className="text-lg text-slate-500">
              Посмотрите, что говорят наши пациенты после посещения клиники
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: 'Анна К.',
                rating: 5,
                text: 'Просто потрясно! Лечение под микроскопом прошло очень быстро и совсем не больно. Теперь только сюда.',
                date: '3 дня назад',
              },
              {
                name: 'Дмитрий В.',
                rating: 5,
                text: 'Ставил импланты у доктора Смирнова. Профессионализм на высшем уровне. Все прижилось идеально.',
                date: 'Неделя назад',
              },
              {
                name: 'Мария С.',
                rating: 4,
                text: 'Делала чистку и отбеливание. Эффект виден сразу, зубы стали на 3 тона светлее. Рекомендую!',
                date: '12.02.2026',
              },
            ].map((review, i) => (
              <div
                key={i}
                className="flex flex-col rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-xl transition-all hover:shadow-2xl"
              >
                <div className="mb-6 flex text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-xl">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <span key={i} className="text-xl text-slate-200">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-8 grow text-lg text-slate-700 italic">&quot;{review.text}&quot;</p>
                <div className="flex items-center space-x-4 border-t border-slate-50 pt-6">
                  <div className="text-primary flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-foreground font-black">{review.name}</div>
                    <div className="text-xs font-bold tracking-tighter text-slate-400 uppercase">
                      {review.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-foreground text-4xl font-black tracking-tight md:text-5xl">
                Наши специализации
              </h2>
              <p className="mt-4 text-xl text-slate-500">
                Комплексный подход к здоровью вашей полости рта
              </p>
            </div>
            <a
              href="/services"
              className="text-primary font-black underline-offset-8 transition-all hover:underline"
            >
              Все услуги →
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Терапия',
                icon: '🦷',
                desc: 'Лечение кариеса и каналов под микроскопом Leica.',
              },
              {
                title: 'Имплантация',
                icon: '🦾',
                desc: 'Установка премиум имплантов за один визит.',
              },
              {
                title: 'Ортодонтия',
                icon: '✨',
                desc: 'Элайнеры и брекет-системы последнего поколения.',
              },
              { title: 'Гигиена', icon: '🪥', desc: 'Профессиональный уход и отбеливание Zoom 4.' },
            ].map((service, i) => (
              <div
                key={i}
                className="group hover:bg-primary relative overflow-hidden rounded-[2.5rem] bg-slate-50 p-10 transition-all hover:scale-[1.02]"
              >
                <span className="mb-8 block text-5xl transition-transform group-hover:scale-110">
                  {service.icon}
                </span>
                <h3 className="text-foreground mb-4 text-2xl font-black group-hover:text-white">
                  {service.title}
                </h3>
                <p className="leading-relaxed font-medium text-slate-500 transition-colors group-hover:text-blue-100">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment" className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="bg-primary shadow-3xl relative overflow-hidden rounded-[4rem] px-8 py-20 text-white shadow-blue-500/20 md:px-20 lg:flex lg:items-center lg:justify-between">
            {/* Decorative circle */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl"></div>

            <div className="z-10 lg:max-w-xl">
              <h2 className="text-5xl leading-tight font-black md:text-7xl">
                Начните новую жизнь <br /> с улыбки
              </h2>
              <div className="mt-12 flex items-center space-x-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="border-primary h-14 w-14 rounded-full border-4 bg-slate-200 shadow-lg"
                    ></div>
                  ))}
                </div>
                <div className="text-blue-50">
                  <div className="text-2xl leading-none font-black uppercase">12 450+</div>
                  <div className="text-xs font-bold tracking-widest uppercase opacity-70">
                    Счастливых улыбок
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
