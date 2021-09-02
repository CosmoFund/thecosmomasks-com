import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Image, Visibility, } from 'semantic-ui-react';
import { IMask } from '../pages/Gallery/GalleryTypes';
import { generateDetailsPath } from '../router/helper';
import MaskImageThumb from './MaskImageThumb';
import * as S from '../store/selectors';



interface IMaskListProps {
  masks: IMask[];
  showed: number;
  showedStep: number;
  showMore: () => void;
  getMaskDataById: (id: number | string) => any;
}

const MaskList: React.FC<IMaskListProps> = ({ masks, showed, showedStep, showMore, getMaskDataById }) => {

  return (
    <Visibility
      once={false}
      onBottomVisible={showMore}
    >
      <Grid columns={4} container doubling>
        {masks.map((mask, index) => {
          if (index < showed + showedStep) {
            // когда в кошельке только ID масок
            if (typeof mask === 'string' || typeof mask === 'number') {
              mask = getMaskDataById(mask);
              if (mask === null)
                return null;
            }
            return (
              <Grid.Column key={mask.index}>
                <div className='mask'>
                  <Link to={generateDetailsPath(mask.index)}>
                    <MaskImageThumb ipfsThumb={mask.ipfsThumb} />
                  </Link>
                  <div className='mask__name'>
                    {mask.name
                      ? mask.name
                      : mask['Character Name']
                        ? mask['Character Name']
                        : 'CosmoMask #' + mask.index
                    }
                    <Link to={generateDetailsPath(mask.index)}>
                      <Image inline src='/images/gallery/open.png' />
                    </Link>
                  </div>
                </div>
              </Grid.Column>
            );
          }
          //return null;
        })}
      </Grid>
    </Visibility>
  )
};

const mapStateToProps = (state: any) => {
  return {
    getMaskDataById: (id: number | string) => S.masksData.getMaskDataById(state, id),
  };
};

export default connect(mapStateToProps)(MaskList);
