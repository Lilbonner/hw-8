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
        <div className="quote-card container">
            <h3>Edit quote</h3>
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                className="authorInput"
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <textarea
                placeholder="Quote text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button onClick={handleSubmit}>Save changes</button>
        </div>
    );
};

export default EditQuote;
