import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-8">Job Search App</h1>
          <div className="flex gap-4">
            <Link href="/jobs" className="px-4 py-2 bg-blue-500 text-white rounded">
              Поиск вакансий
            </Link>
            <Link href="/create-profile" className="px-4 py-2 bg-green-500 text-white rounded">
              Создать профиль
            </Link>
          </div>
        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
footer
      </footer>
    </div>
  );
}
