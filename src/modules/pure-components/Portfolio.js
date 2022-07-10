module.exports = ({ config }) => () => {

    const renderCollection = (collection, i) => {
        const projects = collection.projects.map(renderProject);
        return <div key={i} className="collection">
            <h1>{collection.title}</h1>
            {projects}
        </div>;
    };

    const renderProject = (project, i) => {
        const images = project.images.map(renderImage);

        const filmInfo = [];

        if (project.subtitle) {
            filmInfo.push(project.subtitle);
        }

        if (project.director) {
            filmInfo.push('Director: ' + project.director);
        }

        if (project.cinematographer) {
            filmInfo.push('Cinematographer: ' + project.cinematographer);
        }

        filmInfo.push('Gaffer: Charlie Moukbel');

        const fileInfoElements = filmInfo.map((item, i) => <div key={i}>{item}</div>);

        return <div key={i} className="project">
            <h2>{project.title}</h2>
            {images}
            <div className="project-details">
                {fileInfoElements}
            </div>
        </div>;
    };

    const renderImage = (image, i) => {
        const src = 'screenshots/' + image;
        return <img key={i} src={src} />;
    };

    const collections = config.portfolio.collections.map(renderCollection);
    return <div id="portfolio-container">
        <div className="portfolio">{collections}</div>
    </div>;

};
