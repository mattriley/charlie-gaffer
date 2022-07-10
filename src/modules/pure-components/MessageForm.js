module.exports = () => ({ message, onFieldChanged }) => {

    return <div>
        <div className="field">
            <label>Name</label>
            <input name="name" type="text" value={message.name} onChange={onFieldChanged} />
        </div>
        <div className="field">
            <label>Email</label>
            <input name="email" type="email" value={message.email} onChange={onFieldChanged} />
        </div>
        <div className="field">
            <label>Phone</label>
            <input name="phone" type="tel" value={message.phone} onChange={onFieldChanged} />
        </div>
        <div className="field">
            <label>Message</label>
            <textarea name="message" value={message.message} onChange={onFieldChanged} />
        </div>
    </div>;

};
