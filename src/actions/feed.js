/**
 * Fetch the feed status
 */
export function getFeed() {
    return {
        type: 'ENABLE_FEED',
        feed: {
            enabled: true,
        }
    }
}
