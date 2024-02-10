import { useState } from 'react';
import axios from 'axios';

interface EditQuoteProps {
    id: string;
    initialCategory?: string;
    initialAuthor?: string;
    initialText?: string;
}

const EditQuote: React.FC<EditQuoteProps> = ({ id, initialCategory = '', initialAuthor = '', initialText = '' }) => {
    const [category, setCategory] = useState(initialCategory);
    const [author, setAuthor] = useState(initialAuthor);
    const [text, setText] = useState(initialText);

    const handleSubmit = () => {
        if (!category || !author || !text) {
            alert('You didnt enter anything');
            return;
        }

        const updatedQuote = {
            author: author,
            category: category,
            text: text
        };

        axios.put(`https://plovo-js-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`, updatedQuote)
            .then(response => {
                console.log('The quote has been successfully edited!', response.data);
            })
            .catch(error => {
                console.error('Error while editing a quote:', error);
            });
    };

    return (
        <div className="h-96 w-96 border-2 border-black ml-5 rounded-md mt-10 ">
            <h3 className="font-bold text-2xl ml-2 mt-2">Edit quote:</h3>
            <select
                className="ml-2 rounded-md mt-14"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select a category</option>
                <option value="Star Wars">Star Wars</option>
                <option value="Famous people">Famous people</option>
                <option value="Saying">Saying</option>
                <option value="Humour">Humour</option>
                <option value="Motivational">Motivational</option>
            </select>
            <input
                className="ml-2 rounded-md mt-6"
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <textarea
                className="ml-2 с mt-6 w-80 h-24 rounded-md "
                placeholder="Quote text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button
                className="w-20 mt-6 ml-64 bg-gray-400"
                onClick={handleSubmit}>Save</button>
        </div>
    );
};

export default EditQuote;
