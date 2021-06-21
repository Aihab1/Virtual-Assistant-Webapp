import React from 'react'
import NewsCard from '../NewsCard/NewsCard'
import { Grid, Grow, Typography } from '@material-ui/core'

import useStyles from './styles.js'

const allCards = [
    {
        title: 'News.',
        infoCards: [
            { color: '17, 34, 64', title: 'Latest News', text: 'Give me the latest news' },
            { color: '17, 34, 64', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
            { color: '17, 34, 64', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
            { color: '17, 34, 64', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' }]
    },
    {
        title: 'General Chat.',
        infoCards: [
            { color: '17, 34, 64', title: 'Intro', text: 'Hello, what\'s up? or How are you?' },
            { color: '17, 34, 64', title: 'Small Talk', text: 'Talk to me' },
            { color: '17, 34, 64', title: 'About the Assistant', text: 'Who are you? or Where did you get your accent?' },
            { color: '17, 34, 64', title: 'Piece of Advice', text: 'I need an advice' }]
    },
    {
        title: 'Weather.',
        infoCards: [
            { color: '17, 34, 64', title: 'Weather by Location', info: 'Mumbai, Delhi, India, New York, Abu Dhabi, Malaysia...', text: 'What is the weather like in Varanasi?' },
            { color: '17, 34, 64', title: 'Weather by Date', info: 'August the 3rd, 4th July, Tomorrow...', text: 'What will be the temperature on 3rd August?' },
            { color: '17, 34, 64', title: 'Predictions', text: 'Is it going to rain tomorrow?' },
            { color: '17, 34, 64', title: 'Weather Conditions', text: 'Is it chilly outside in Gujarat? or What is the humidity in Bangalore?' },]
    },
    {
        title: 'Bitcoin Pricing.',
        attribution: 'CoinDesk',
        infoCards: [
            { color: '17, 34, 64', title: 'Basic Knowledge', text: 'What is a bitcoin? or How to buy bitcoin?' },
            { color: '17, 34, 64', title: 'Pricing over Time', info: 'Past month, Today, Past week, Last year...', text: 'What was the growth of bitcoin in the past month?' },
            { color: '17, 34, 64', title: 'Price by Currency', info: 'Euros, Dollars, Rubles, Pounds, Rupees', text: 'How much is bitcoin in Indian rupees?' },
            { color: '17, 34, 64', title: 'General Questions', text: 'Who owns the most bitcoin? or Is it good time to invest into bitcoin?' },]
    },
];

const NewsCards = ({ articles, activeArticle }) => {
    const classes = useStyles();

    if (!articles || (articles && !articles.length)) {
        return (
            <div>
                {allCards.map(({ infoCards, title, attribution }) => (
                    <div>
                        <h1 className={classes.title}>{title}</h1>
                        {attribution && <a href="https://www.coindesk.com/price/bitcoin" className={classes.attribution}>Powered by {attribution}</a>}
                        <Grow in>
                            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                                {infoCards.map((infoCard) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
                                        <div className={classes.card} style={{ background: `rgba(${infoCard?.color}, 1)` }}>
                                            <Typography variant="h5" style={{ fontSize: '1.6rem' }}>{infoCard?.title}</Typography>
                                            {infoCard?.info ?
                                                (<Typography variant="p" style={{ fontSize: '1.2rem' }}>
                                                    <span style={{ color: '#64ffda', fontWeight: '500' }}>
                                                        {infoCard?.title.split(' ')[2]}:
                                                    </span>
                                                    <br /> {infoCard?.info}
                                                </Typography>) : null}
                                            <Typography variant="p" style={{ fontSize: '1.2rem' }}>
                                                <span style={{ color: '#64ffda', fontWeight: '500' }}>
                                                    Try saying:
                                                </span>
                                                <br /> <i>{infoCard.text}</i></Typography>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grow>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {articles?.map((article, i) => (
                    <Grid key={i} item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
                        <NewsCard article={article} activeArticle={activeArticle} i={i} />
                    </Grid>
                ))}
            </Grid>
        </Grow>
    )
}

export default NewsCards
