
import Skeleton from '@mui/material/Skeleton';
import Typography, { TypographyProps } from '@mui/material/Typography'
import styles from './Main.module.scss'


const variantsTitles = [
    'h2',
  'body1',
  'body1',
  'body1',
  ] as readonly TypographyProps['variant'][];

  const variantPosts = [
    'body1',
    'h3',
  'h5',
  ] as readonly TypographyProps['variant'][];

  const variantSettings = [
    'body1',
    'h3',
  'h5',
  ] as readonly TypographyProps['variant'][];

const MainSkeleton = () => {
    return(
        <>
             <div className={styles.block}  style={{marginTop:'20px'}}>
          {variantsTitles.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
           <Skeleton /> 
        </Typography>
      ))}
    </div>
    <Skeleton  width={'250px'} style={{marginLeft:'10px'}}/> 
    <ul style={{display:'flex',listStyleType:'none',width:'660px',justifyContent:'space-between'}}>
        {[1,2,3].map((e:any)=>
         <li key={e} className={styles.block} style={{width:'180px'}}>
         <Skeleton variant="rectangular" width={'100%'} height={'100px'} />
    </li>
    )}
    </ul>

    <div style={{marginTop:'20px'}} className={styles.block}>
    {variantPosts.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
           <Skeleton /> 
        </Typography>
      ))}
      <Skeleton  variant="rectangular" width={'100%'} height={'300px'}  style={{marginTop:'10px'}}/>
      <Typography marginTop={'20px'} component="div" variant='body1'>
           <Skeleton /> 
        </Typography>
    </div>
        </>
    )
}

export default MainSkeleton