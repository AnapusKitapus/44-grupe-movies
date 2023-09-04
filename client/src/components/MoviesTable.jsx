import { Link } from 'react-router-dom';

export function MoviesTable({ movies }) {
    return (
        <div className="table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                </tr>
            </thead>
            <tbody>
                {
                    movies.map((movie, idx) => (
                        <tr key={idx}>
                            <td>1,001</td>
                            <td>random</td>
                            <td>data</td>
                            <td>placeholder</td>
                            <td>text</td>
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