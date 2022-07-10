module.exports = ({ config }) => message => {

    return config.stage !== 'prod' || config.technicalContactEmail.includes(message.email);

};
