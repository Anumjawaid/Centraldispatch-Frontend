import React, { useState } from 'react';
import { Box, Grid, Paper, TextField, MenuItem, Button, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { get_posts } from '../../Store/postReducer';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }).map((_, i) => String(currentYear - i));

const trailerOptions = [
  { value: '', label: 'Any' },
  { value: 'Open', label: 'Open' },
  { value: 'Closed', label: 'Closed' },
];

const stateOptions = [
  { value: '', label: 'Any' },
  { value: 'Pickup', label: 'Pickup' },
  { value: 'Delivery', label: 'Delivery' },
];

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((s) => s.posts || {});

  const [filters, setFilters] = useState({
    fromYear: '',
    toYear: '',
    trailerType: '',
    make: '',
    model: '',
    state: '',
    vehicleYear: '',
  });

  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };

  const handleSearch = () => {
    const params = {
      fromYear: filters.fromYear,
      toYear: filters.toYear,
      trailerType: filters.trailerType,
      make: filters.make,
      model: filters.model,
      state: filters.state,
      vehicleYear: filters.vehicleYear,
    };
    dispatch(get_posts(params));
    setSearched(true);
  };

  const handleReset = () => {
    setFilters({ fromYear: '', toYear: '', trailerType: '', make: '', model: '', state: '', vehicleYear: '' });
    setSearched(false);
  };

  const hasFilters = Object.values(filters).some((v) => v && v !== "");

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>

            <TextField select fullWidth label="From (Year)" name="fromYear" value={filters.fromYear} onChange={handleChange} sx={{ mb: 2 }}>
              <MenuItem value="">Any</MenuItem>
              {years.map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </TextField>

            <TextField select fullWidth label="To (Year)" name="toYear" value={filters.toYear} onChange={handleChange} sx={{ mb: 2 }}>
              <MenuItem value="">Any</MenuItem>
              {years.map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </TextField>

            <TextField select fullWidth label="Trailer Type" name="trailerType" value={filters.trailerType} onChange={handleChange} sx={{ mb: 2 }}>
              {trailerOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </TextField>

            <TextField fullWidth label="Make" name="make" value={filters.make} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Model" name="model" value={filters.model} onChange={handleChange} sx={{ mb: 2 }} />

            <TextField select fullWidth label="State" name="state" value={filters.state} onChange={handleChange} sx={{ mb: 2 }}>
              {stateOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </TextField>

            <TextField select fullWidth label="Year" name="vehicleYear" value={filters.vehicleYear} onChange={handleChange} sx={{ mb: 2 }}>
              <MenuItem value="">Any</MenuItem>
              {years.map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </TextField>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button variant="contained" fullWidth onClick={handleSearch}>Search</Button>
              <Button variant="outlined" fullWidth onClick={handleReset}>Reset</Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, minHeight: 400, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Results</Typography>
            <Divider sx={{ mb: 2 }} />

            {!hasFilters && !searched && (
              <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="body1">Use the filters to get results.</Typography>
              </Box>
            )}

            {postsState.loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress />
              </Box>
            )}

            {hasFilters && !postsState.loading && (
              <Box>
                {(postsState.posts || []).length === 0 ? (
                  <Box sx={{ py: 6, textAlign: 'center' }}>
                    <Typography variant="body1">No results found for selected filters.</Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {(postsState.posts || []).map((post, i) => (
                      <Grid item xs={12} md={6} key={i}>
                        <Paper sx={{ p: 2, borderRadius: 2 }}>
                          <Typography sx={{ fontWeight: 700 }}>{post.title || post.trailerType || 'Shipment'}</Typography>
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>{post.price ? `$${post.price}` : ''}</Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>{post.notes}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterSidebar;
