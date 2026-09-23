import axios from "axios";
import { useEffect, useState } from "react";
import type { Quote } from "../types/quote";

interface QuotesResponse {
    quotes: Quote[];
}

function QuoteOfTheDay() {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get<QuotesResponse>("https://dummyjson.com/quotes");
                const quotes = response.data.quotes;
                const day = new Date().getDate();

                const selected = day === 31
                    ? quotes[Math.floor(Math.random() * quotes.length)]
                    : quotes.find((q) => q.id === day);

                setQuote(selected ?? null);
            } catch (e) {
                console.error(e);
                setError(true);
            }
        })();
    }, []);

    if (error) return <p>Impossible de charger la citation du jour.</p>;
    if (!quote) return <p>Chargement de la citation...</p>;

    return (
        <blockquote className="quote-of-the-day">
            <h3>Citation du jour</h3>
            <p>« {quote.quote} »</p>
            <footer>— {quote.author}</footer>
        </blockquote>
    );
}

export default QuoteOfTheDay;
