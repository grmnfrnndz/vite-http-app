// empieza con mayuscula por es considerar el componente de mi app


/**
 * @returns {Object} quote information
 */
const fetchQuote = async () => {
    const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
    const data = await response.json();
    return data[0];
}



/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingBadApp =  async (element) => {
    document.querySelector('#app-title').innerHTML = 'BreakingBad App';
    element.innerHTML = 'Loading...';
    
    // const {author, quote} = await fetchQuote();

    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('button');
    nextQuoteButton.innerText = 'Next Quote';


    const renderQuote = (quote) => {
        quoteLabel.innerHTML = quote.quote;
        authorLabel.innerHTML = quote.author;
        element.replaceChildren(quoteLabel, authorLabel, nextQuoteButton);
    }



    // my resolution
    // const nextQuote = () => {
    //     element.innerHTML = 'Loading...';

    //     fetchQuote()
    //     .then(renderQuote);
    // }
    // nextQuote();

    // nextQuoteButton.addEventListener('click', () => {
    //     nextQuote();
    // }); 



    nextQuoteButton.addEventListener('click', async () => {
        element.innerHTML = 'Loading...';
        const quote = await fetchQuote();
        renderQuote(quote);
    });


    fetchQuote()
    .then(renderQuote);


}

