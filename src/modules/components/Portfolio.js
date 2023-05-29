const projectKeys = ['subtitle', 'Director', 'Cinematographer', 'Gaffer'];
const startsWithUpper = str => str[0] === str[0].toUpperCase();

module.exports = ({ config }) => () => {

    const renderCollection = (collection, i) => {
        const renderProject = (p, i) => {
            const project = { ...p, gaffer: 'Charlie Moukbel' };

            const images = project.images.map((image, i) => {
                return <img key={i} src={`screenshots/${image}`} />;
            });

            const projectDetailsArray = projectKeys.flatMap(key => {
                const val = project[key.toLowerCase()];
                if (!val) return [];
                return startsWithUpper(key) ? `${key}: ${val}` : val;
            });

            const projectDetails = projectDetailsArray.map((item, i) => <div key={i}>{item}</div>);

            return <div key={i} className="project">
                <h2>{project.title}</h2>
                <p>{collection.title}</p>
                <div className="images">{images}</div>
                <div className="project-details">{projectDetails}</div>
                <br />
                <hr />
            </div>;
        };

        const projects = collection.projects.map(renderProject);
        return <div key={i} className="collection">{projects}</div>;
    };

    const collections = config.portfolio.collections.map(renderCollection);
    return <div id="portfolio">{collections}</div>;

};
