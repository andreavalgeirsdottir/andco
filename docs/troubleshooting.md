# Troubleshooting

## Windows

### Slow `yarn install`.

Make sure that you add `Node` to the exclude list of **Windows Defender**, as it's scanning every package which makes installs 10-15x slower.

##### Node path (default) on Windows

```
c:\Program Files\nodejs
```

### Reference

- https://ilikekillnerds.com/2017/02/yarn-slow-windows-disable-windows-defender/
