import { Link } from 'react-router-dom';

export function MoviesTable({ movies }) {
    return (
        <div className="table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Movie name</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    movies.map((movie, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{movie.name}</td>
                            <td>
                                <button className='btn btn-primary'>WIEW</button>
                                <button className='btn btn-primary'>EDIT</button>
                                <button className='btn btn-primary'>DELETE</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        {
            movies.length === 0 && (
                <div className="alert alert-primary alert-dismissible fade show" role="alert">
                    Panasu jog neturi jokiu filmu. Eik ir <Link to="/movies/add" className="alert-link">sukurk nauja filma</Link>.
                </div>
            )
        }
</div>
    );
}