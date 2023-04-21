import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const fetchTwitterPost = (twitterPostID: string) => {
    const options = {
        method: 'GET',
        url: `https://api.twitter.com/2/tweets/${twitterPostID}`,
        params: {
            'tweet.fields':
                'public_metrics,attachments,author_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld',
            expansions: 'attachments.media_keys,author_id',
            'media.fields': 'duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width',
            'user.fields': 'id,name,profile_image_url,username,verified',
        },
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
    };

    return axios
        .request(options)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            throw error;
        });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { twitterPostID } = req.query;
    if (typeof twitterPostID !== 'string') {
        res.status(400).json({ message: 'Invalid twitterPostID parameter' });
        return;
    }

    try {
        const data = await fetchTwitterPost(twitterPostID);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
