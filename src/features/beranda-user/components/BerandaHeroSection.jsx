import React from "react";
import { useNavigate } from "react-router-dom";
import point from "../../../assets/images/poin.png";
import gambarPoin from "../../../assets/images/gambar-poin.png";
import useUser from "../../../store/userStore";
import usePoints from "../hooks/usePoints";
import LoadingSpinnerInComponent from "../../../components/ui/LoadingSpinnerInComponent";

const BerandaHeroSection = () => {
  const { user: currentUser } = useUser();
  const userName = currentUser?.nama_lengkap || "User";
  const { points: userPoints, loading, error } = usePoints();
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate("/report");
  };

  const handleTukarClick = () => {
    const userName = currentUser?.nama_lengkap || "User";
    const userEmail = currentUser?.email || "Email tidak tersedia";

    const message = `Halo, saya ${userName}. Saya ingin menukar poin saya. Email saya: ${userEmail}.`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://wa.me/6285357549320?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="flex flex-col lg:flex-row bg-green-50 dark:bg-gray-800 pt-8 lg:pt-16 pb-8 px-6 lg:px-24 rounded-lg gap-4 lg:items-end">
      <div className="flex flex-col bg-green-50 dark:bg-gray-800 px-0 md:px-6 rounded-lg space-y-4 basis-full lg:basis-5/12">
        <div>
          <h1 className="dark:text-white text-3xl lg:text-4xl font-bold pb-3">
            Hallo, {userName}
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-200 pb-3">
            Selamat Datang di Greenly!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row bg-primary-01 rounded-lg shadow-inner overflow-hidden">
          <div className="flex-shrink-0 w-full lg:w-2/4">
            <img
              src={gambarPoin}
              alt="Illustration"
              className="w-full h-full object-cover rounded-t-lg lg:rounded-s-lg"
            />
          </div>

          <div className="flex flex-col justify-center pt-6 px-6 flex-grow space-y-2">
            <img
              src={point}
              alt="point"
              className="h-12 lg:h-16 w-12 lg:w-16"
            />
            <h3 className="font-medium text-xl lg:text-2xl">POINKU</h3>
            <div className="bg-primary-01 pb-4 rounded-lg">
              <div className="flex flex-col">
                <span className="text-4xl lg:text-5xl font-bold">
                  {loading ? (
                    <span className="text-lg font-medium">
                      <LoadingSpinnerInComponent />
                    </span>
                  ) : error ? (
                    <span className="text-lg font-medium text-red-600">
                      {JSON.stringify(error)}
                    </span>
                  ) : (
                    userPoints
                  )}
                </span>
                <button
                  className="mt-5 text-sm text-green-600 hover:text-green-800 text-right"
                  onClick={handleTukarClick}
                >
                  Tukar Poin &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-primary-01 py-8 lg:py-12 px-6 lg:px-20 rounded-lg shadow-md basis-full lg:basis-7/12">
        <h2 className="text-3xl lg:text-4xl pb-5 font-semibold">
          Melihat sampah menumpuk dan tidak pada tempatnya?
        </h2>
        <p className="text-lg lg:text-xl mt-4">
          Yuk, laporkan melalui Greenly dan dapatkan poin sebagai apresiasi atas
          kontribusi Anda dalam menjaga kebersihan lingkungan!
        </p>
        <div className="flex justify-center">
          <button
            className="mt-6 lg:mt-12 bg-primary-05 hover:bg-green-700 text-white py-2 px-20 lg:px-28 rounded-lg transition-all duration-300"
            onClick={handleReportClick}
          >
            Lapor Disini!
          </button>
        </div>
      </div>
    </div>
  );
};

export default BerandaHeroSection;
