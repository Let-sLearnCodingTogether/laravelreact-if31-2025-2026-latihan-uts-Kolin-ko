import http from "@/api/apiClient";
import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function QuotePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [quotes, setQuotes] = useState([]);

    const fetchQuotes = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await http.get("/quotes");

            setQuotes(response.data.data);

        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [])


    // Kode lain

    const deleteQuote = async (id) => {

        try {
            // 1. Tampilkan indikator loading
            setIsLoading(true);
            // 2. Kirim permintaan DELETE ke API
            const response = await http.delete(`/quotes/${id}`);
            // 3. Jika berhasil, muat ulang data kutipan
            if (response.status === 200) {
                fetchQuotes();
            }
        } catch (error) {
            // 4. Tangani jika terjadi error
            console.error("Gagal menghapus quote:", error);
        } finally {
            // 5. Sembunyikan indikator loading
            setIsLoading(false);
        }
    }


     useEffect(() => {
        fetchQuotes()
    }, [fetchQuotes])

    if(isLoading) {
        return <div>Loading...</div>
    } else {
        return <div className="container mx-auto space-y-5">
            <h1 className="font-semibold text-2xl">Quotes</h1>
            <NavLink
                to="/new-quote"
                className="inline-block bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
            >
                Buat Quote Baru
            </NavLink>
            <ul className="space-y-4 divide-y divide-zinc-200 dark:divide-zinc-700">
                 {quotes.map((quote) => (
                    <li key={quote.id} className="pt-4 p-5 border border-slate-300">
                        <blockquote className="text-neutral-700 italic">
                            "{quote.quote}"
                        </blockquote>
                        <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            — {quote.author}
                            {quote.year && <span className="ml-1">({quote.year})</span>}
                            {quote.source && <span className="ml-2 italic">• {quote.source}</span>}
                        </div>
                        {quote.category && (
                            <span className="mt-2 inline-block text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                                {quote.category}
                            </span>
                        )}
                        <div className="mt-5">
                            <Button onClick={() => deleteQuote(quote.id)}>Hapus</Button>
                            <NavLink to={`/update-quote/${quote.id}`}
                            className={"px-5 py-2.5 rounded-lg bg-zinc-900 text-white font-semibold cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg active:scale-95 active:shadow-md focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500"}>
                                Update</NavLink>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    }


}

