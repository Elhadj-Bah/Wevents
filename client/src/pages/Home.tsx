import SearchForm from "../components/SearchForm";

const Home = () => {
  return(
    <div className="d-flex justify-content-center align-items-center vh-50 frosted-glass">
      <div className="w-75">
        <h2 className="text-center mb-4">Search for Events</h2>
        <SearchForm />
      </div>
   </div>
  )
};

export default Home;
