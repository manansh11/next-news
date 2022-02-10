import styles from '../../styles/Feed.module.css';
import { Toolbar } from '../../component/toolbar';

import { useRouter } from 'next/router';


export const Feed = ({ pageNumber, articles }) => {
    console.log(articles, pageNumber);
    const router = useRouter();
    return(
        <div className='page-container'>
            <Toolbar />
            <div className={styles.main}>
            {articles.map((article, index) => (
                <div key={index} className={styles.post}>
                    <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
                    <p>{article.description}</p>
                    {!!article.urlToImage && <img src={article.urlToImage} />}
                </div>
            ))}
            </div>

            <div className={styles.pag}>
                <div 
                    onClick={() => {
                        if (pageNumber > 1) {
                            router.push(`/feed/${pageNumber-1}`)
                        }
                    }}
                    className={pageNumber === 1 ? styles.disabled : styles.active}>
                        Previous page
                    </div>

                    <div>#{pageNumber}</div>

                    <div 
                    onClick={() => {
                        if (pageNumber < 5) {
                            router.push(`/feed/${pageNumber+1}`)
                        }
                    }}
                    className={pageNumber === 5 ? styles.disabled : styles.active}>
                        Next page
                    </div>


            </div>

        </div>
    );
}

export const getServerSideProps = async (pageContext) => {
    // Get the page number
    const pageNumber = pageContext.query.slug;

    // What to do if the page url localhost:3000/feed/X <- is not 1-4
    if(!pageNumber || pageNumber < 1 || pageNumber > 5){
        return {
            props: {
                articles: [],
                pageNumber: 1,   
            }
        }
    }

    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=ca&pageSize=5&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.PRIVATE_KEY}`,
            },
        },
    );

    const apiJson = await apiResponse.json();


    const { articles } = apiJson;

    return {
        props:{
            articles,
            pageNumber: Number.parseInt(pageNumber)
        }
    }

};

export default Feed;