import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Home from "./home";
import Contact from "./contact";
import Gallery from "./gallery";
import Items from "./items";
import ErrorNotFound from "./error";
import ProductOverview from "./productOverview";
import BookingPage from "./bookingPage";
import MyOrders from "./myOrders";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="items" element={<Items />} />
          <Route path="booking/*" element={<BookingPage />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="product/:key" element={<ProductOverview />} />
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
