import Link from "next/link";

interface IPaginate {
  currentPage: number;
  totalPages: number;
  pageType: string;
}

const Paginate = ({ currentPage, totalPages, pageType }: IPaginate) => {
  return (
    <div className="flex justify-center gap-4 mt-6 mb-6">
      {currentPage > 1 && (
        <Link
          href={`/movies/${pageType}/?page=${Number(currentPage) - 1}`}
          className="bg-cyan-900 text-white font-bold py-2 px-4 rounded-r"
        >
          Prev
        </Link>
      )}
      {currentPage < totalPages && (
        <Link
          href={`/movies/${pageType}/?page=${Number(currentPage) + 1}`}
          className="bg-cyan-900 text-white font-bold py-2 px-4 rounded-l"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Paginate;
