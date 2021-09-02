import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation, TFunction } from 'react-i18next';
import {
  Container,
  Segment,
  Header,
  Select,
  Search,
  Grid,
  Image,
} from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import queryString from 'query-string';
import _ from 'lodash';
import Page from '../../components/Page';
import Number from '../../components/Number';
import {
  optionsCharacter,
  optionsBackground,
  optionsMask,
  optionsItem,
  optionsLabel,
  optionsExclusive,
} from '../../constants/index';
import MaskList from '../../components/MaskList';
import { getAdaptiveClassName, mobileBreakpoint } from '../../helpers/Media';
//import { IFilter } from './GalleryTypes';
import './Gallery.scss';
//import { maskMock } from './__mock__/masksMock';
import * as S from '../../store/selectors';
import { getLoadingGif } from '../../components/Base64ImageData';




const translateOptions = (arr: any[], t: TFunction): any[] => {
  const newArr: any[] = [];
  let i = 0;
  while (i < arr.length) {
    newArr[i] = { ...arr[i], text: t(arr[i].text) }
    i++;
  }
  return newArr;
}

const parceSearch = (search: any) => {
  const result: any = {};
  const parsed = queryString.parse(search);
  if (parsed.character) result.character = parsed.character;
  if (parsed.mask) result.mask = parsed.mask;
  if (parsed.item) result.item = parsed.item;
  if (parsed.background) result.background = parsed.background;
  if (parsed.label) result.label = parsed.label;
  if (parsed.exclusive) result.exclusive = parsed.exclusive;
  if (parsed.name) result.name = parsed.name;

  return parsed;
}


const showedStep = 20;

function StateReducer(initialState: any) {
  let init = initialState;
  return (state: any, action: any) => {
    switch (action.type) {
      case 'SET_DATA':
        init.data = action.data;
        state.data = action.data;
        return { ...state };
      case 'CLEAN':
        return init;
      case 'START':
        return { ...state, loading: true };
      case 'FINISH':
        return { ...state, loading: false, results: action.results };
      default:
        throw new Error();
    }
  }
}

function FilterReducer(initialState: any) {
  return (state: any, action: any) => {
    switch (action.type) {
      case 'CLEAN':
        return initialState;
      case 'SET':
        return { ...state, [action.name]: action.value };
      default:
        throw new Error();
    }
  }
}

const initialFilter = {
  character: 'all', mask: 'all',
  item: 'all', background: 'all',
  label: 'all', exclusive: 'all',
  name: '',
};


const Gallery: React.FC = (props: any) => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();
  const optionsCharacterT = translateOptions(optionsCharacter, t);
  const optionsBackgroundT = translateOptions(optionsBackground, t);
  const optionsMaskT = translateOptions(optionsMask, t);
  const optionsItemT = translateOptions(optionsItem, t);
  const optionsLabelT = translateOptions(optionsLabel, t);
  const optionsExclusiveT = translateOptions(optionsExclusive, t);

  const { dataLoaded } = props;

  const history = useHistory();
  const location = useLocation();

  const [showed, setShowed] = useState(0);
  const initialState = {
    loading: false,
    results: props.data,
    data: props.data,
  };

  const [state, dispatchState] = useReducer(
    StateReducer(initialState), initialState
  );
  const { loading, data, results } = state;

  const parcedData = parceSearch(location.search);
  const parcedFilter: any = {};
  if (parcedData.character) parcedFilter.character = parcedData.character;
  if (parcedData.mask) parcedFilter.mask = parcedData.mask;
  if (parcedData.item) parcedFilter.item = parcedData.item;
  if (parcedData.background) parcedFilter.background = parcedData.background;
  if (parcedData.label) parcedFilter.label = parcedData.label;
  if (parcedData.exclusive) parcedFilter.exclusive = parcedData.exclusive;
  if (parcedData.name) parcedFilter.name = parcedData.name;
  const [filter, dispatchFilter] = useReducer(
    FilterReducer(initialFilter),
    Object.assign({}, initialFilter, parcedFilter)
  );

  // установка значений в поисковую строку
  const oldSearch = location.search;
  const filterCopy = JSON.parse(JSON.stringify(filter));
  if (filterCopy.character === 'all') delete filterCopy.character;
  if (filterCopy.mask === 'all') delete filterCopy.mask;
  if (filterCopy.item === 'all') delete filterCopy.item;
  if (filterCopy.background === 'all') delete filterCopy.background;
  if (filterCopy.label === 'all') delete filterCopy.label;
  if (filterCopy.exclusive === 'all') delete filterCopy.exclusive;
  if (filterCopy.name === '') delete filterCopy.name;
  const newSearch = '?' + queryString.stringify(filterCopy);
  if (oldSearch !== newSearch) {
    location.search = newSearch;
    history.replace(location);
  }

  const handleSearchChange = useCallback((e: any, se: any) => {
    setShowed(0);
    dispatchState({ type: 'START' });
    dispatchFilter({ type: 'SET', name: se.name, value: se.value });
    filter[se.name] = se.value;

    const reName = new RegExp(
      _.escapeRegExp(se.name === 'name' ? se.value : filter.name), 'i'
    );
    const isMatch = (result: any) => {
      let matched = true;
      if (matched && filter.character !== 'all') matched = result.Character === filter.character;
      if (matched && filter.mask !== 'all') matched = result.Mask === filter.mask;
      if (matched && filter.item !== 'all') matched = result.Item === filter.item;
      if (matched && filter.background !== 'all') matched = result.Background === filter.background;
      if (matched && filter.label !== 'all') matched = result.Label === filter.label;
      if (matched && filter.exclusive !== 'all') matched = result.Exclusive === filter.exclusive;
      if (matched && filter.name !== '') matched = reName.test(result.name);
      return matched;
    };

    dispatchState({ type: 'FINISH', results: _.filter(props.data, isMatch) });
  }, [props.data, filter]);


  // обработка когда подгрузились маски
  useEffect(() => {
    dispatchState({ type: 'SET_DATA', data: props.data });

    dispatchState({ type: 'START' });
    const reName = new RegExp(
      _.escapeRegExp(filter.name), 'i'
    );
    const isMatch = (result: any) => {
      let matched = true;
      if (matched && filter.character !== 'all') matched = result.Character === filter.character;
      if (matched && filter.mask !== 'all') matched = result.Mask === filter.mask;
      if (matched && filter.item !== 'all') matched = result.Item === filter.item;
      if (matched && filter.background !== 'all') matched = result.Background === filter.background;
      if (matched && filter.label !== 'all') matched = result.Label === filter.label;
      if (matched && filter.exclusive !== 'all') matched = result.Exclusive === filter.exclusive;
      if (matched && filter.name !== '') matched = reName.test(result.name);
      return matched;
    };
    dispatchState({ type: 'FINISH', results: _.filter(props.data, isMatch) });
  }, [props.data, data]);


  const showMore = () => {
    setShowed(showed + showedStep);
  }

  return (
    <Page
      title={t('Gallery') + ' - CosmoMasks'}
      className={dataLoaded ? 'container_gallery' : undefined}
    >
      <div className={getAdaptiveClassName('gallery__header', isMobile)}>
        <Container>
          <Header as='h1' content={t('Gallery')} />
        </Container>
      </div>

      <Segment as='section' vertical basic className='gallery_filters'>
        <Container>
          <Grid columns={7} doubling className='gallery__filters'>
            <Grid.Column>
              {t('Character')}
              <Select
                fluid
                name='character'
                options={optionsCharacterT}
                value={filter.character}
                onChange={handleSearchChange}
              />
            </Grid.Column>
            <Grid.Column>
              {t('Mask')}
              <Select
                fluid
                name='mask'
                options={optionsMaskT}
                value={filter.mask}
                onChange={handleSearchChange}
              />
            </Grid.Column>
            <Grid.Column>
              {t('Item')}
              <Select
                fluid
                name='item'
                options={optionsItemT}
                value={filter.item}
                onChange={handleSearchChange}
              />
            </Grid.Column>
            <Grid.Column>
              {t('Background')}
              <Select
                fluid
                name='background'
                options={optionsBackgroundT}
                value={filter.background}
                onChange={handleSearchChange}
              />
            </Grid.Column>
            <Grid.Column>
              {t('Label')}
              <Select
                fluid
                name='label'
                options={optionsLabelT}
                value={filter.label}
                onChange={handleSearchChange}
              />
            </Grid.Column>
            <Grid.Column>
              {t('Exclusive')}
              <Select
                fluid
                name='exclusive'
                options={optionsExclusiveT}
                value={filter.exclusive}
                onChange={handleSearchChange}
              />
            </Grid.Column>
            <Grid.Column className={isMobile ? 'fullWidth' : undefined}>
              {t('Search by name')}
              <Search
                fluid
                name='name'
                loading={loading}
                showNoResults={false}
                value={filter.name}
                onSearchChange={handleSearchChange}
                placeholder=''
                pattern='[A-Za-z0-9]'
              />
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>

      {dataLoaded
        ? <div className={getAdaptiveClassName('gallery', isMobile)}>
          <Segment as='section' vertical basic>
            <Container>
              <Header as='h2' textAlign='center'>
                <Number value={results.length} /> {t('Masks with these filters')}
              </Header>
              <MaskList
                masks={results.sort((a: any, b: any) => b.index - a.index)}
                showed={showed} showedStep={showedStep}
                showMore={showMore}
              />
            </Container>
          </Segment>
        </div>
        : <div>
          <Segment as='section' vertical basic>
            <Container>
              <Image
                centered
                alt={t('Loading')}
                src={getLoadingGif()}
              />
            </Container>
          </Segment>
        </div>
      }
    </Page>
  );
};

const mapStateToProps = (state: any) => {
  return {
    dataLoaded: S.masksData.isLoaded(state),
    data: S.masksData.getData(state),
  };
};

export default connect(mapStateToProps)(Gallery);
