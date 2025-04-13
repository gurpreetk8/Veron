import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SeriesDetails = () => {
  const { slug } = useParams();

  return (
    <>
      <Navbar />
    <div className="p-10 min-h-screen">
      <h1 className="text-3xl font-bold">Series Details</h1>
      <p className="mt-4 text-lg">You're viewing: {slug.replace(/-/g, " ")}</p>
    </div>
      <Footer />
    </>
  );
};

export default SeriesDetails;
