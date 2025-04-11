function    FavouriteEvent() {
    const [favouriteEvents, setFavouriteEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavouriteEvents = async () => {
            const response = await fetch('http://localhost:3001/favourite-events');
            const data = await response.json();
            setFavouriteEvents(data);
            setLoading(false);
        };

        fetchFavouriteEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Favourite Events</h1>
            <ul>
                {favouriteEvents.map((event) => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
        </div>
    );
}   
export default FavouriteEvent;