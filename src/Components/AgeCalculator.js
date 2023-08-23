import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AgeCalculator() {

    const [showDay, setShowDay] = useState("");
    const [showMonth, setShowMonth] = useState("");
    const [showYear, setShowYear] = useState("");
    const [showresult, setShowResult] = useState(false);
    const [showFocus, setShowFocus] = useState("");

    const initialValues = {
        day: "",
        month: "",
        year: "",
    }

    const validationSchema = Yup.object({

        month: Yup.number()
            .required('Month is required')
            .min(1, 'Month must be between 1 and 12')
            .max(12, 'Month must be between 1 and 12'),

        day: Yup.number()
            .required('Day is required')
            .test('valid-day', 'Invalid day for selected month and year', function (
                value
            ) {
                const { year, month } = this.parent;
                if (year && month && value) {
                    const selectedYear = parseInt(year, 10);
                    const selectedMonth = parseInt(month, 10);
                    const selectedDay = parseInt(value, 10);

                    const daysInMonth = new Date(
                        selectedYear,
                        selectedMonth,
                        0
                    ).getDate();
                    return selectedDay >= 1 && selectedDay <= daysInMonth;
                }
                return true;
            }),

        year: Yup.number()
            .required('Year is required')
            .min(1980, 'Year must be 1980')
            .max(2023, 'Month must till 2023')
    })

    const onSubmit = (values) => {
        setShowResult(true);

        const birthDate = new Date(`${values.year}-${values.month}-${values.day}`);
        const currentDate = new Date();

        let yearDiff = currentDate.getFullYear() - birthDate.getFullYear();
        let monthDiff = currentDate.getMonth() - birthDate.getMonth();
        let dayDiff = currentDate.getDate() - birthDate.getDate();

        if (dayDiff < 0) {
            monthDiff -= 1;
            const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            dayDiff += lastMonthDate.getDate();
        }

        if (monthDiff < 0) {
            yearDiff -= 1;
            monthDiff += 12;
        }

        setShowYear(yearDiff);
        setShowMonth(monthDiff);
        setShowDay(dayDiff);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ values, handleChange }) => <Form>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div id="bgmanage" className=" col-md-8">

                        <div className="row">
                            {/* Column 1 */}
                            <div className="col-3 text-start">
                                <div className="mb-3">
                                    <label htmlFor="dayInput" className="form-label">
                                        DAY
                                    </label>
                                    <Field
                                        type="number"
                                        className="form-control"
                                        id="dayInput"
                                        placeholder="DD"
                                        // value={day}
                                        name="day"
                                        // onChange={handleDayChange}

                                        onFocus={() => setShowFocus("day")}
                                        onBlur={() => setShowFocus("")}
                                        style={{
                                            boxShadow: showFocus === "day" ? '0 0 5px hsl(259, 100%, 65%)' : 'none'
                                        }}
                                    />
                                    <ErrorMessage name="day" component="div"
                                        className="text-danger fw-bold" />

                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="col-3 text-start" >
                                <div className="mb-3">
                                    <label htmlFor="dayInput" className="form-label">
                                        MONTH
                                    </label>
                                    <Field
                                        type="number"
                                        className="form-control"
                                        id="dayInput"
                                        placeholder="MM"
                                        // value={month}
                                        name="month"
                                        // onChange={handleMonthChange}


                                        onFocus={() => setShowFocus("month")}
                                        onBlur={() => setShowFocus("")}
                                        style={{
                                            boxShadow: showFocus === "month" ? '0 0 5px hsl(259, 100%, 65%)' : 'none',
                                        }}

                                    />
                                    <ErrorMessage name="month" component="div"
                                        className="text-danger fw-bold" />

                                </div>
                            </div>

                            {/* Column 3 */}
                            <div className="col-3 text-start" >
                                <div className="mb-3">
                                    <label htmlFor="dayInput" className="form-label">
                                        YEAR
                                    </label>
                                    <Field
                                        type="number"
                                        className="form-control"
                                        id="dayInput"
                                        placeholder="YYYY"
                                        // value={year}
                                        name="year"
                                        // onChange={handleYearChange}

                                        onFocus={() => setShowFocus("year")}
                                        onBlur={() => setShowFocus("")}
                                        style={{
                                            boxShadow: showFocus === "year" ? '0 0 5px hsl(259, 100%, 65%)' : 'none',
                                        }}

                                    />
                                    <ErrorMessage name="year" component="div"
                                        className="text-danger fw-bold" />

                                </div>
                            </div>
                        </div>

                        {/* Submit Image here */}
                        <button id="setbtn" type="submit">
                            <img id="imgbtn" src="../icon-arrow.svg" className="img-fluid" alt="" />
                        </button>


                        {/* hr line here */}
                        <hr />


                        {/* Show Result box */}
                        <div>
                            <h3 > {showresult === true ? <span>{showYear}</span> : <span>- -</span>} years</h3>
                            <h3 > {showresult === true ? <span>{showMonth}</span> : <span>- -</span>} months</h3>
                            <h3 > {showresult === true ? <span>{showDay}</span> : <span>- -</span>} days</h3>
                        </div>
                    </div>
                </div>
            </Form>}
        </Formik>
    );
}