#!/bin/bash
# Jenkins container içinde Docker kurulumu
# Bu script Jenkins container'ına exec ile çalıştırılmalıdır:
# docker exec -it temiziz-jenkins bash setup.sh

set -e

echo "=== Jenkins Docker Kurulumu ==="

# Sistem paketlerini güncelle
apt-get update

# Docker ve Docker Compose kur
apt-get install -y sudo docker.io docker-compose curl

# Jenkins kullanıcısını docker grubuna ekle
usermod -aG docker jenkins

# Sudoers ayarı - Jenkins kullanıcısına şifresiz sudo yetkisi
echo "jenkins ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Docker socket izinlerini ayarla
chmod 666 /var/run/docker.sock

echo "=== Kurulum tamamlandı! ==="
echo "Jenkins artık Docker komutlarını çalıştırabilir."
