(async () => {
    await import('@babel/register');
    await import('./app/app.js');
})();
