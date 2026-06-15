import Footer from "@/src/components/layout/Footer";


export default function DashboardLayout({ children }) {
  return (
    <div >

      <div>

        <main className="">
          {children}
          <Footer/>
        </main>

      </div>
    </div>
  );
}