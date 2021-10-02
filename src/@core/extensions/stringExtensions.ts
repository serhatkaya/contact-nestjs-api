interface String {
    getEncrypted();

}

String.prototype.getEncrypted = function (): string {
    return Number(this).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
