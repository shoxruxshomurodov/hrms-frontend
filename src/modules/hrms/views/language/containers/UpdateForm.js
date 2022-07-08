import React, {Component} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {withTranslation} from "react-i18next";
import LoaderMini from "../../../../../components/Loader/LoaderMini";
import {get, isEqual, head, keyBy} from "lodash";
import {connect} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import Normalizer from "../../../../../services/normalizer";
import LanguageScheme from "../../../../../schema/Language";
import Actions from "../../../Actions";
import {Link} from "react-router-dom";
import Breadcrumb from "../../../../../components/Breadcrumb";

const UpdateScheme = Yup.object().shape({
  key: Yup.string().required("key введен не полностью"),
  uz: Yup.string().required("uz введите введен не полностью"),
  ru: Yup.string().required("ru введите введен не полностью"),
  en: Yup.string().required("en введите введен не полностью")
});

class UpdateForm extends Component {
  state = {
    isFetched: null
  };
  Update = (values, actions) => {
    const {updateForm} = this.props;
    const {key, ru, uz, en} = values;
    let translations = [
      {content: uz, locale: "uz"},
      {content: ru, locale: "ru"},
      {content: en, locale: "en"}
    ];
    updateForm({key, translations}, actions)
  };

  render() {
    const {isFetched} = this.state;
    let {entities, drawToRender, t, id} = this.props;
    let languages = Normalizer.Denormalize(
        drawToRender,
        [LanguageScheme],
        entities
    );
    languages = languages.filter((language) =>
        isEqual(language.id, parseInt(id))
    );


    return (
        <>
          <Breadcrumb
              titles={[
                {id: 1, title: t("Language"), url: "/language"},
                {id: 2, title: t("Update")},
                {id: 3, title: get(languages[0], "key")}
              ]}
          />
          <Formik
              initialValues={{
                key: get(head(languages), "key"),
                uz: get(keyBy(get(head(languages), 'translations'), 'locale'), 'uz.content', ""),
                ru: get(keyBy(get(head(languages), 'translations'), 'locale'), 'ru.content', ""),
                en: get(head(languages), 'content', "")
              }}
              validationSchema={UpdateScheme}
              onSubmit={(values, actions) => {
                this.Update(values, actions);
              }}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <form
                    className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-30"
                    onSubmit={handleSubmit}
                >
                  <div className="form-group row g-mb-25">
                    <label
                        htmlFor="key"
                        className="col-2 col-form-label text-right"
                    >
                      {t("Key")}
                    </label>
                    <div className="col-6">
                      <input
                          type="text"
                          className="form-control rounded-0 form-control-md"
                          id="key"
                          aria-describedby="emailHelp"
                          placeholder="Enter key"
                          name="key"
                          value={values.key}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoFocus
                          disabled={true}
                      />
                      {errors.key && touched.key && (
                          <small className="form-control-feedback">
                            {errors.key}
                          </small>
                      )}
                    </div>
                  </div>
                  <div className="form-group row g-mb-25">
                    <label htmlFor="uz" className="col-2 col-form-label text-right">
                      {t("in Uzbek")}
                    </label>
                    <div className="col-6">
                      <input
                          type="text"
                          className="form-control
                                        rounded-0 form-control-md"
                          id="uz"
                          placeholder="enter text in uzbek"
                          name="uz"
                          value={values.uz}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      {errors.uz && touched.uz && (
                          <small className="form-control-feedback">{errors.uz}</small>
                      )}
                    </div>
                  </div>
                  <div className="form-group row g-mb-25">
                    <label htmlFor="ru" className="col-2 col-form-label text-right">
                      {t("in Russian")}
                    </label>
                    <div className="col-6">
                      <input
                          type="text"
                          className="form-control
                                        rounded-0 form-control-md"
                          id="ru"
                          placeholder="enter text in russian"
                          name="ru"
                          value={values.ru}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      {errors.ru && touched.ru && (
                          <small className="form-control-feedback">{errors.ru}</small>
                      )}
                    </div>
                  </div>
                  <div className="form-group row g-mb-25">
                    <label htmlFor="en" className="col-2 col-form-label text-right">
                      {t("in English")}
                    </label>
                    <div className="col-6">
                      <input
                          type="text"
                          className="form-control
                                        rounded-0 form-control-md"
                          id="exampleInputPassword1"
                          placeholder="enter text in english"
                          name="en"
                          value={values.en}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      {errors.en && touched.en && (
                          <small className="form-control-feedback">{errors.en}</small>
                      )}
                    </div>
                  </div>
                  <div className="form-group row g-mb-25">
                    <div className="col-6 offset-2">
                      <button
                          type="submit"
                          className="btn btn-md u-btn-primary rounded-0"
                          disabled={isEqual(isFetched, "update")}
                      >
                        {isEqual(isFetched, "update") && <LoaderMini/>}
                        {t("Update")}
                      </button>
                      <Link to={`/language`} className="btn btn-md rounded-0 ml-2">
                        <span className="ml-2">{t("Cancel")}</span>
                      </Link>
                    </div>
                  </div>
                </form>
            )}
          </Formik>
          <ToastContainer/>
        </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    drawToRender: get(state, "normalizer.data.language.result.content", []),
    entities: get(state, "normalizer.entities", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateForm: (attributes, formMethods) => {
      dispatch({
        type: Actions.LANGUAGE_CONTROLLER_UPDATE.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb: {
            success: (nData, data) => {
              toast.dismiss();
              toast.success('Успешно', {
                position: "top-right",
                autoClose: 1000,
              })
              setTimeout(() => {
                window.history.back()
              }, 1500)
            },
            fail: (e) => {
              toast.dismiss();
              toast.error("Ошибка", {
                position: "top-right",
                autoClose: 1000,
              })
            },
          },
        },
      });
    }
  };
};
export default withTranslation("HRMS")(
    connect(mapStateToProps, mapDispatchToProps)(UpdateForm)
);
