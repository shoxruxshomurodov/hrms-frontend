class ValidationResponseYii {
	static setErrors = (e, setFieldError) => {
		const data = e.response.data;
		data.map((item) => {
			return setFieldError(item.field, item.message);
		});
	};
}

export default ValidationResponseYii;
