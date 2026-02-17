import Link from 'next/link';
import Copyright from './Copyright';
import OrganizationCard from './OrganizationCard';
import { LogoFooter } from '@/components/LogoFooter';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-900 py-24 text-white">
      {/* ... code ... */}
      <div className="absolute top-0 left-1/2 h-px w-full -translate-x-1/2 bg-linear-to-r from-transparent via-slate-700 to-transparent"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-4xl font-black tracking-tighter text-white">
              <LogoFooter />
            </Link>
            <p className="mt-8 max-w-sm text-lg leading-relaxed font-medium text-slate-400">
              Стоматология нового поколения. Мы объединяем опыт лучших врачей и передовые технологии
              будущего.
            </p>
            <div className="mt-10 flex space-x-6">
              <div className="hover:bg-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-colors">
                VK
              </div>
              <div className="hover:bg-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-colors">
                TG
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-primary mb-8 text-xs font-black tracking-[0.2em] uppercase">
              Контакты
            </h4>
            <ul className="space-y-6 text-lg font-medium text-slate-400">
              <li className="flex items-start space-x-4">
                <span className="text-primary mt-1">📍</span>
                <span>640023, Курганская обл., г. Курган, микрорайон 2, №9/3</span>
              </li>
              <li className="flex flex-col space-y-6">
                <div className="flex items-start space-x-4">
                  <span className="text-primary mt-1.5 flex-shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.28-2.28a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        Городской
                      </span>
                      <div className="flex flex-col space-y-0.5">
                        <a
                          href="tel:+73522222880"
                          className="font-black text-white decoration-primary/30 transition-colors hover:text-primary hover:underline"
                        >
                          +7 (3522) 222-880
                        </a>
                        <a
                          href="tel:+73522541741"
                          className="font-black text-white decoration-primary/30 transition-colors hover:text-primary hover:underline"
                        >
                          +7 (3522) 541-741
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 border-t border-white/5 pt-6">
                  <span className="text-primary mt-1.5 flex-shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12" y2="18.01" />
                    </svg>
                  </span>
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        Мобильный
                      </span>
                      <div className="flex flex-col space-y-0.5">
                        <a
                          href="tel:+79080011999"
                          className="font-black text-white decoration-primary/30 transition-colors hover:text-primary hover:underline"
                        >
                          +7 (908) 001-19-99
                        </a>
                        <a
                          href="tel:+79125755569"
                          className="font-black text-white decoration-primary/30 transition-colors hover:text-primary hover:underline"
                        >
                          +7 (912) 575-55-69
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-primary mb-8 text-xs font-black tracking-[0.2em] uppercase">
              Часы работы
            </h4>
            <ul className="space-y-4 text-lg font-medium text-slate-400">
              <li className="flex justify-between">
                <span>Пн — Пт</span>
                <span className="text-white">08:00 — 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Сб</span>
                <span className="text-white">09:00 — 16:00</span>
              </li>
              <li className="flex justify-between opacity-50">
                <span>Вс</span>
                <span className="text-white">Выходной</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-white/5 pt-16">
          <h4 className="mb-10 text-xs font-black tracking-[0.2em] text-blue-400 uppercase">
            Контролирующие органы
          </h4>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              {
                name: 'Росздравнадзор',
                desc: 'Территориальный орган по Курганской области',
                address: '640000, г. Курган, ул. Ленина, 5, оф. 501',
                phone: '8 (3522) 41-81-36',
              },
              {
                name: 'Департамент здравоохранения',
                desc: 'Департамент здравоохранения Курганской области',
                address: '640000, г. Курган, ул. Томина, 49',
                phone: '8 (3522) 49-85-01',
              },
              {
                name: 'Роспотребнадзор',
                desc: 'Управление по Курганской области',
                address: '640020, г. Курган, ул. Куйбышева, 46',
                phone: '8 (3522) 42-13-36',
              },
            ].map((org, i) => (
              <OrganizationCard key={i} {...org} />
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-3xl border border-white/5 bg-white/[0.02] p-8 text-xs leading-relaxed text-slate-500 transition-colors hover:bg-white/[0.04]">
          Данный сайт носит исключительно информационный характер и предназначен для образовательных
          целей, посетители сайта не должны использовать материалы, размещенные на сайте, в качестве
          медицинских рекомендаций. Стоматология «Дантист» в лице сотрудников и руководителей не
          несут ответственности за возможные последствия, возникшие в результате использования
          информации, размещенной на сайте. Материалы и цены, размещенные на сайте, не являются
          публичной офертой, определяемой положениями статьи 437 Гражданского кодекса Российской
          Федерации. Предоставление услуг осуществляется на основании договора об оказании
          медицинских услуг. Просьба перед получением услуги уточнять цены у ответственных
          сотрудников стоматологии «Дантист».
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase md:flex-row">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <Copyright />
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 opacity-50 md:justify-start">
              <span>ИНН 4501136472</span>
              <span className="hidden md:inline">•</span>
              <span>ОГРН 1074501009362</span>
            </div>
          </div>
          <div className="flex space-x-8">
            <Link href="#" className="transition-colors hover:text-white">
              Политика Юр. лица
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Лицензии
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
