module.exports = ({ config }) => message => {

    const isProd = config.stage === 'prod';

    const lines = [];
    if (!isProd) lines.push('TEST ONLY');
    lines.push(
        `Name: ${message.name}`,
        `Email: ${message.email}`,
        `Phone: ${message.phone}`,
        `Message: ${message.message}`
    );

    const prodSubject = `${message.name} sent you a message`;
    const Subject = isProd ? prodSubject : `[TEST] ${prodSubject}`;

    const ToAddresses = [];
    const CcAddresses = [];

    if (isProd) {
        ToAddresses.push(config.primaryContactEmail);
        CcAddresses.push(config.technicalContactEmail);
    } else {
        ToAddresses.push(config.technicalContactEmail);
    }

    return {
        Source: config.noreplyEmail,
        Destination: { ToAddresses, CcAddresses },
        Message: {
            Subject,
            Body: {
                Html: { Data: lines.join('<br/>') },
                Text: { Data: lines.join('\n') }
            }
        }
    };

};
