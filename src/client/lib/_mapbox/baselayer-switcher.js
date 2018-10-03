class BaseLayerControl {
  onAdd(map) {
    this._map = map
    return this._container
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }

  setContainer(container) {
    this._container = container
    this._container.className = `${this._container.className} mapboxgl-ctrl`;
  }

  switchLayer(style) {
    this._map.setStyle(style)
  }
}

export default function baseLayerSwitcher() {
  return new BaseLayerControl()
}
