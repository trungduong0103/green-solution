import {
    FILTER_BY_CITY,
    FILTER_BY_CITY_WITH_START_DATE,
    FILTER_BY_DISTRICT,
    FILTER_BY_DISTRICT_WITH_CITY,
    FILTER_BY_START_DATE,
    FILTER_BY_START_DATE_WITH_CITY,
    FILTER_BY_START_DATE_WITH_CITY_AND_DISTRICT,
    FILTER_LOCATIONS_BY_KEYWORD,
    RESET_FILTERS
} from "../types";

export function filterByKeyword(keyword) {
    return function (dispatch) {
        return dispatch({type: FILTER_LOCATIONS_BY_KEYWORD, payload: keyword});
    };
}

export function filterByStartDate(startDate, cities, districts) {
    return function (dispatch) {
        if (cities && districts) return dispatch({
            type: FILTER_BY_START_DATE_WITH_CITY_AND_DISTRICT,
            payload: {startDate, cities, districts}
        });
        if (cities) return dispatch({type: FILTER_BY_START_DATE_WITH_CITY, payload: {startDate, cities}});
        return dispatch({type: FILTER_BY_START_DATE, payload: {startDate}});
    }
}

export function filterByCity(cities, startDate) {
    return function (dispatch) {
        if (startDate) return dispatch({type: FILTER_BY_CITY_WITH_START_DATE, payload: {cities, startDate}});
        return dispatch({type: FILTER_BY_CITY, payload: {cities}});
    }
}

export function filterByDistrict(districts, cities, startDate) {
    return function (dispatch) {
        if (cities && startDate) return dispatch({type: FILTER_BY_START_DATE_WITH_CITY_AND_DISTRICT, payload: {districts, cities, startDate}});
        if (cities) return dispatch({type: FILTER_BY_DISTRICT_WITH_CITY, payload: {districts, cities}});
        return dispatch({type: FILTER_BY_DISTRICT, payload: {districts}});
    }
}

export function resetFilters() {
    return function (dispatch) {
        return dispatch({type: RESET_FILTERS});
    };
}

