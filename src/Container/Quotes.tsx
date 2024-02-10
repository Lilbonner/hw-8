import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

interface Quote {
    id: string;
    author: string;
    category: string;
    text: string;
}

const Quotes: React.FC = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = quotes.filter((quote) => quote.category === selectedCategory);
            setFilteredQuotes(filtered);
        } else {
            setFilteredQuotes(quotes);
        }
    }, [selectedCategory, quotes]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://plovo-js-default-rtdb.europe-west1.firebasedatabase.app/quotes.json');
            if (response.data) {
                const quotesArray: Quote[] = Object.entries(response.data).map(([id, quote]: [string, any]) => ({
                    id,
                    ...quote,
                }));
                setQuotes(quotesArray);
                setFilteredQuotes(quotesArray);
            }
        } catch (error) {
            console.error('Ошибка при получении цитат:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`https://plovo-js-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`);
            const updatedQuotes = quotes.filter((quote) => quote.id !== id);
            setQuotes(updatedQuotes);
            setFilteredQuotes(updatedQuotes);
        } catch (error) {
            console.error('Ошибка при удалении цитаты:', error);
        }
    };

    const handleCategoryClick = (category: string) => {
        if (category === 'All') {
            setFilteredQuotes(quotes);
        } else {
            setSelectedCategory(category);
        }
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className='flex ml-20 mt-4'>
                    <h3 className="font-bold">Categories:</h3>
                    <ul className="flex ml-20">
                        <li className="ml-10 underline" onClick={() => handleCategoryClick('All')}>All</li>
                        <li className="ml-10 underline" onClick={() => handleCategoryClick('Star Wars')}>Star Wars</li>
                        <li className="ml-10 underline" onClick={() => handleCategoryClick('Famous people')}>Famous people</li>
                        <li className="ml-10 underline" onClick={() => handleCategoryClick('Saying')}>Saying</li>
                        <li className="ml-10 underline" onClick={() => handleCategoryClick('Humour')}>Humour</li>
                        <li className="ml-10 underline" onClick={() => handleCategoryClick('Motivational')}>Motivational</li>
                    </ul>
                </div>

            </div>
            <div className="quotes">
                <h2 className="font-bold text-2xl ml-10 mt-4 ">Quotes:</h2>
                {filteredQuotes.map((quote) => (
                    <div className="border-amber-50 border-2 w-96 ml-10 mt-5 pl-1 rounded-md pt-2" key={quote.id}>
                        <div>
                            <p>"{quote.text}"</p>
                            <p>— {quote.author}</p>
                        </div>
                        <div>
                            <button className="ml-56" onClick={() => handleDelete(quote.id)}>Delete</button>
                            <button className="cardBtn">
                                <NavLink className="ml-3" to={`/${quote.id}/EditQuote`}>
                                    Edit Quote
                                </NavLink>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quotes;
