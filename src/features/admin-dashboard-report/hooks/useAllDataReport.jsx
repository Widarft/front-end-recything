import { useState, useEffect } from "react";
import instance from "../../../utils/instance";

const useAllDataReport = (
  startDate = "",
  endDate = "",
  sortOrder = "desc",
  page = 1,
  perPage = 10
) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalReport, setTotalReport] = useState(0);

  useEffect(() => {
    const fetchAllDataReport = async () => {
      setLoading(true);
      try {
        const response = await instance.get("/admin/report-rubbish", {
          params: {
            sort: sortOrder,
            start_date: startDate,
            end_date: endDate,
            page,
            per_page: perPage,
          },
        });

        console.log("Response Data:", response.data); // Debugging

        if (
          response.data?.meta?.code === 200 &&
          response.data?.data?.data?.items
        ) {
          const { items, pagination } = response.data.data.data;
          setReports(items || []);
          setTotalPages(pagination?.total_pages || 1);
          setTotalReport(pagination?.total_report || 0);
        } else {
          setError(
            response.data?.meta?.message || "Terjadi kesalahan tidak dikenal"
          );
        }
      } catch (err) {
        setError("Gagal memuat data. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllDataReport();
  }, [startDate, endDate, sortOrder, page, perPage]);

  const updateReportStatus = async (id, newStatus) => {
    try {
      const response = await instance.put(`/report-rubbish/${id}/status`, {
        status: newStatus,
      });

      if (response.status === 200) {
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.id === id ? { ...report, status: newStatus } : report
          )
        );
      } else {
        console.error("Failed to update status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return {
    reports,
    loading,
    error,
    totalPages,
    totalReport,
    updateReportStatus,
  };
};

export default useAllDataReport;
